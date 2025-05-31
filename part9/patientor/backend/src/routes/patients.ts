import express from 'express';

import { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

export default patientsRouter;
