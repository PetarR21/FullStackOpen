import { HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <p>
        <em>{entry.description}</em>
      </p>
      <p>diagnose by {entry.specialist}</p>
      <p>
        discharged {entry.discharge.date}: {entry.discharge.criteria}
      </p>
    </div>
  );
};

export default Hospital;
