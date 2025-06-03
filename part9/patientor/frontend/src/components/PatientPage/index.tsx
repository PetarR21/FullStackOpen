import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { Patient, Entry, Diagnosis } from '../../types';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

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
      {Object.values(patient.entries).map((entry: Entry) => {
        return (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes
                ? Object.values(entry.diagnosisCodes).map(
                    (code: Diagnosis['code']) => {
                      return (
                        <li key={code}>
                          {code} {`${findDignosisForCode(code)?.name}`}
                        </li>
                      );
                    }
                  )
                : null}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;
