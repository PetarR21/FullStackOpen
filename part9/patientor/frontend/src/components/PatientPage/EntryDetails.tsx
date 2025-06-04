import { Entry } from '../../types';
import HospitalEntry from './Hospital';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return null;
    case 'HealthCheck':
      return null;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
