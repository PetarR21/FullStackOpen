import express from 'express';

import { Request, Response, NextFunction } from 'express';
import { Entry, NewPatient, NonSensitivePatient, Patient } from '../types';
import patientService from '../services/patientService';

import { NewPatientSchema, parseNewEntry } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

/* Middleware */
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    console.log(error.issues);
    res.status(400).send({ error: error.issues });
  }
  if (error instanceof Error) {
    res.status(400).send({ error: error.message });
  } else {
    next(error);
  }
};

/* *** */

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  '/:id/entries',
  (req: Request, res: Response<Entry>, next: NextFunction) => {
    if (!req.params.id) {
      res.sendStatus(404);
    }
    try {
      const newEntry = parseNewEntry(req.body);
      const addedEntry = patientService.addEntry(req.params.id, newEntry);

      if (addedEntry) {
        res.json(addedEntry);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.use(errorMiddleware);

export default router;
