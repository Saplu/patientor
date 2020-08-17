import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { setPatient } from '../state/reducer';
import { Patient, Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage: React.FC = () => {
  const [{ selectedPatient, diagnosis }, dispatch] = useStateValue();
  const id = useParams<{id: string}>().id;

  React.useEffect(() => {
    const getPatient = async() => {
      if (!selectedPatient || selectedPatient.id !== id)
      {
        try{
          const { data: Patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          dispatch(setPatient(Patient));
        } catch(e) {
          console.error(e);
        }
      }
    };
    getPatient();
  }, [dispatch, id, selectedPatient]);

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
      <h3>Entries</h3>
      {selectedPatient.entries.map(e => (
        <p key={e.id}>{e.date} {e.description}
        {e.diagnosisCodes?.map(d => (
          <li key={d.toString()}>{d} {' '}
          {diagnosis.find(di => di.code === d.toString())?.name}
          </li>
        ))}</p>
      ))}
    </div>
  )
}

export default PatientPage