import { HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div className='entry'>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
      <p>
        discharged {entry.discharge.date}: {entry.discharge.criteria}
      </p>
    </div>
  );
};

export default Hospital;
