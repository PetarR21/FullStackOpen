import { object, z } from 'zod';
import { Gender, NewPatient, Diagnosis, NewEntry, HealthCheckRating } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const parseNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
    const parsedDescription = z.string().parse(object.description);
    const parsedDate = z.string().date().parse(object.date);
    const parsedSpecialist = z.string().parse(object.specialist);
    const parsedType = z.string().parse(object.type);

    const newBaseEntry = {
      description: parsedDescription,
      date: parsedDate,
      specialist: parsedSpecialist,
    };

    if (parsedType === 'HealthCheck') {
      if ('healthCheckRating' in object) {
        const newEntry: NewEntry = {
          ...newBaseEntry,
          type: parsedType,
          healthCheckRating: z.nativeEnum(HealthCheckRating).parse(object.healthCheckRating),
        };
        return newEntry;
      }
      throw new Error('Inccorect data: some fields are missing');
    } else if (parsedType === 'OccupationalHealthcare') {
      if (
        'employerName' in object &&
        'sickLeave' in object &&
      ) {
        

        const newEntry: NewEntry = {
          ...newBaseEntry,
          employerName: z.string().parse(object.employerName),
          
        };
      }
    }
  }

  throw new Error('Inccorect data: some fields are missing');
};

export default toNewPatient;
