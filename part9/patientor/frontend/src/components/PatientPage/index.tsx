import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { Patient, Entry, Diagnosis } from '../../types';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import EntryDetails from './EntryDetails';
import { Button } from '@mui/material';
import AddEntryForm from './AddEntryForm';

const PatientPage = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof AxiosError) {
          if (error.response) {
            errorMessage += error.response.data;
          }
        }
        console.log(errorMessage);
      }
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    if (id) {
      fetchPatient(id);
      fetchDiagnoses();
    }
  }, [id]);

  if (!patient) {
    return <p>Not Found</p>;
  }

  const findDignosisForCode = (code: Diagnosis['code']): Diagnosis | null => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    if (diagnosis) {
      return diagnosis;
    }
    return null;
  };

  return (
    <div>
      <h2>
        {patient.name}{' '}
        {patient.gender === 'male' ? (
          <MaleIcon />
        ) : patient.gender === 'female' ? (
          <FemaleIcon />
        ) : null}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      <Button variant='contained' style={{ marginBottom: '2rem' }}>
        Add New Entry
      </Button>
      <AddEntryForm diagnosisCodes={diagnoses.map((d) => d.code)} />
      {patient.entries.map((entry: Entry) => {
        return (
          <div key={entry.id} className='entry'>
            <EntryDetails entry={entry} />
            <ul>
              {entry.diagnosisCodes?.map((c) => {
                return (
                  <li key={c}>
                    {c} {`${findDignosisForCode(c)?.name}`}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;
