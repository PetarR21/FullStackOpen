import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import patientService from '../../services/patients'
import { Patient } from '../../types'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

const PatientPage = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const patient = await patientService.getPatient(id)
        setPatient(patient)
      } catch (error) {
        let errorMessage = 'Something went wrong.'
        if (error instanceof AxiosError) {
          if (error.response) {
            errorMessage += error.response.data
          }
        }
        console.log(errorMessage)
      }
    }

    if (id) {
      fetchPatient(id)
    }
  }, [id])

  if (!patient) {
    return <p>Not Found</p>
  }

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
    </div>
  )
}

export default PatientPage
