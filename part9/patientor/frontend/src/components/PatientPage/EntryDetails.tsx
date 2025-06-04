import { Entry, EntryType } from '../../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <Hospital entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
