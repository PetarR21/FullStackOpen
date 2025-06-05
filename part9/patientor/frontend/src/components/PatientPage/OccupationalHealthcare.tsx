import { OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <div>
        {entry.date} <WorkIcon /> {entry.employerName}
      </div>
      <p>
        <em>{entry.description}</em>
      </p>
      {entry?.sickLeave ? (
        <p>
          Sick leave: from {entry.sickLeave.startDate} to{' '}
          {entry.sickLeave.endDate}
        </p>
      ) : (
        ''
      )}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcare;
