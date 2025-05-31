import express from 'express';
import { Diagnosis } from '../types';
import { Response } from 'express';
import diagnosisService from '../services/diagnosisService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getDiagnoses());
});

export default diagnosesRouter;
