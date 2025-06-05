import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { Patient, Entry, Diagnosis, NewEntry } from '../../types';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import EntryDetails from './EntryDetails';
import { Alert, Button } from '@mui/material';
import AddEntryForm from './AddEntryForm';

const PatientPage = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [clear, setClear] = useState(false);

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

  const cancelForm = () => {
    setShowForm(false);
    setClear(!clear);
  };

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const addNewEntry = async (values: NewEntry) => {
    if (id) {
      try {
        const entry = await patientService.createEntry(id, values);
        setPatient({ ...patient, entries: [...patient.entries, entry] });
        cancelForm();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (
            e?.response?.data &&
            typeof e?.response?.data.error === 'string'
          ) {
            const message = e.response.data.error.replace(
              'Something went wrong. Error: ',
              ''
            );
            console.error(message);
            notify(message);
          } else {
            notify('Unrecognized axios error');
          }
        } else {
          console.error('Unknown error', e);
          notify('Unknown error');
        }
      }
    }
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

      <Button
        variant='contained'
        style={{
          marginBottom: '2rem',
          display: showForm ? 'none' : 'block',
        }}
        onClick={() => {
          setShowForm(true);
        }}
      >
        Add New Entry
      </Button>
      <div style={{ display: showForm ? 'block' : 'none' }}>
        {error && <Alert severity='error'>{error}</Alert>}
        <AddEntryForm
          diagnosisCodes={diagnoses.map((d) => d.code)}
          onCancel={cancelForm}
          onSubmit={addNewEntry}
          clear={clear}
        />
      </div>
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
