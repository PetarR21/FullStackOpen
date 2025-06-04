import patients from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, newEntry: NewEntry): Entry | null => {
  const patient = findById(id);

  if (patient) {
    const addedEntry = {
      id: uuid(),
      ...newEntry,
    };

    patient.entries.push(addedEntry);
    return addedEntry;
  } else {
    return null;
  }
};

export default {
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};
