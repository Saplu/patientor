import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage: React.FC = () => {
  const [{ selectedPatient, patients }, dispatch] = useStateValue();
  const id = useParams<{id: string}>().id;

  React.useEffect(() => {
    const getPatient = async() => {
      if (!selectedPatient || selectedPatient.id !== id)
      {
        try{
          const { data: Patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          dispatch({ type:"SET_PATIENT", payload: Patient});
          console.log(Patient);
        } catch(e) {
          console.error(e);
        }
      }
    };
    getPatient();
  }, [dispatch]);

  if (!selectedPatient){
    return (
      <div>
        nothing found.
      </div>
    )
  }
  return (
    <div>
      <h2>{selectedPatient.name}</h2>
      <p>{selectedPatient.gender}</p>
      <p>ssn: {selectedPatient.ssn}</p>
      <p>occupation: {selectedPatient.occupation}</p>
    </div>
  )
}

export default PatientPage