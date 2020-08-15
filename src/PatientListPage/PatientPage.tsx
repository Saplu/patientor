import React from 'react';
import { useStateValue } from "../state";

const PatientPage: React.FC = () => {
  const [{ selectedPatient }] = useStateValue();

  if (!selectedPatient){
    return (
      <div>
        nothing found.
      </div>
    )
  }
  return (
    <div>
      {selectedPatient.name}
      {selectedPatient.dateOfBirth}
    </div>
  )
}

export default PatientPage