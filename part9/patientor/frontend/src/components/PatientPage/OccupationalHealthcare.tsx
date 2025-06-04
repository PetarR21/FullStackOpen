import { OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div className='entry'>
      <div>
        {entry.date} <WorkIcon /> {entry.employerName}
      </div>
      <p>
        <em>{entry.description}</em>
      </p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcare;
