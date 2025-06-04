import { useState } from 'react';
import { EntryType, HealthCheckRating } from '../../types';
import {
  FormGroup,
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

const typeOptions: TypeOption[] = Object.values(EntryType).map((e) => ({
  value: e,
  label: e,
}));

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

const AddEntryForm = ({ diagnosisCodes }: { diagnosisCodes: string[] }) => {
  const [type, setType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState<string[]>([]);
  const [healthRating, setHealthRating] = useState(HealthCheckRating.Healthy);

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

  return (
    <form className='entryForm'>
      <h3>New {type} entry</h3>
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
      {healthCheckSubform()}
    </form>
  );
};

export default AddEntryForm;
