import { SyntheticEvent, useEffect, useState } from 'react';
import { EntryType, HealthCheckRating, NewEntry } from '../../types';
import {
  Button,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

interface TypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
  { value: EntryType.Hospital, label: 'Hospital' },
];

interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

const ratingOptions: RatingOption[] = Object.values(HealthCheckRating)
  .filter((v) => typeof v === 'number')
  .map((h) => ({
    value: h,
    label: h.toString(),
  }));

const AddEntryForm = ({
  diagnosisCodes,
  onCancel,
  onSubmit,
  clear,
}: {
  diagnosisCodes: string[];
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  clear: boolean;
}) => {
  const [type, setType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState<string[]>([]);
  const [healthRating, setHealthRating] = useState(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

  useEffect(() => {
    setType(EntryType.HealthCheck);
    setDescription('');
    setDate('');
    setSpecialist('');
    setCodes([]);
    setHealthRating(HealthCheckRating.Healthy);
    setEmployerName('');
    setStartDate('');
    setEndDate('');
    setDischargeDate('');
    setCriteria('');
  }, [clear]);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(EntryType).find((t) => t.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();

    const {
      target: { value },
    } = event;

    setCodes(typeof value === 'string' ? value.split(', ') : value);
  };

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating)
        .filter((v) => typeof v === 'number')
        .find((r) => r === value);
      if (rating) {
        setHealthRating(rating);
      }
    }
  };

  const healthCheckSubform = () => {
    return (
      <FormGroup>
        <InputLabel style={{ fontWeight: 'bold', marginBlock: 5 }}>
          Health Check Rating:
        </InputLabel>
        <Select fullWidth value={healthRating} onChange={onRatingChange}>
          {ratingOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
    );
  };

  const occupationalSubform = () => {
    return (
      <FormGroup>
        <TextField
          label='Employer name'
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <FormGroup>
          <InputLabel className='leaveLabel'>Sickleave</InputLabel>
          <FormGroup className='leaveGroup'>
            <InputLabel className='leaveLabel'>start:</InputLabel>
            <Input
              type='date'
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
          </FormGroup>
          <FormGroup className='leaveGroup'>
            <InputLabel className='leaveLabel'>end:</InputLabel>
            <Input
              type='date'
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </FormGroup>
        </FormGroup>
      </FormGroup>
    );
  };

  const hospitalSubform = () => {
    return (
      <FormGroup>
        <InputLabel className='leaveLabel'>Discharge</InputLabel>
        <FormGroup className='leaveGroup'>
          <InputLabel className='leaveLabel'>Date: </InputLabel>
          <Input
            type='date'
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
        </FormGroup>
        <FormGroup className='leaveGroup'>
          <InputLabel className='leaveLabel'>Criteria</InputLabel>
          <Input
            type='text'
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        </FormGroup>
      </FormGroup>
    );
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (type === EntryType.HealthCheck) {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes: codes,
        type,
        healthCheckRating: healthRating,
      });
    } else if (type === EntryType.OccupationalHealthcare) {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes: codes,
        type,
        employerName,
        sickLeave: {
          startDate,
          endDate,
        },
      });
    } else if (type === EntryType.Hospital) {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes: codes,
        type,
        discharge: {
          date: dischargeDate,
          criteria,
        },
      });
    }
  };

  return (
    <form className='entryForm' onSubmit={addEntry}>
      <h3>New {typeOptions.find((o) => o.value === type)?.label} entry</h3>
      <FormGroup>
        <InputLabel style={{ fontWeight: 'bold', marginBlock: 5 }}>
          Entry Type:
        </InputLabel>
        <Select fullWidth value={type} onChange={onTypeChange}>
          {typeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>Date:</InputLabel>
        <Input
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel style={{ fontWeight: 'bold', marginBlock: 5 }}>
          Diagnosis Codes:
        </InputLabel>
        <Select multiple fullWidth value={codes} onChange={onDiagnosisChange}>
          {diagnosisCodes.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      {type === EntryType.HealthCheck ? healthCheckSubform() : ''}
      {type === EntryType.OccupationalHealthcare ? occupationalSubform() : ''}
      {type === EntryType.Hospital ? hospitalSubform() : ''}
      <Grid style={{ marginTop: '1rem' }}>
        <Grid item>
          <Button
            color='secondary'
            variant='contained'
            style={{ float: 'left' }}
            type='button'
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: 'right',
            }}
            type='submit'
            variant='contained'
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
