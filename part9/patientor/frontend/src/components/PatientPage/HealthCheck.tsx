import { HealthCheckEntry, HealthCheckRating } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  let favouriteStyle = null;

  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      favouriteStyle = { color: 'green' };
      break;
    case HealthCheckRating.LowRisk:
      favouriteStyle = { color: 'yellow' };
      break;
    case HealthCheckRating.HighRisk:
      favouriteStyle = { color: 'orange' };
      break;
    case HealthCheckRating.CriticalRisk:
      favouriteStyle = { color: 'red' };
      break;
    default:
      favouriteStyle = { color: 'white' };
  }

  return (
    <div>
      <div>
        {entry.date} <MedicalInformationIcon />
      </div>
      <p>
        <em>{entry.description}</em>
      </p>
      <FavoriteIcon style={favouriteStyle} />
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheck;
