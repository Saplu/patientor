import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { setPatient, addHealthCheckEntry } from '../state/reducer';
import { Patient, Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import AddEntryModal from '../AddEntryModal/index';
import { Button } from 'semantic-ui-react';
import { HealthCheckEntryFormValues } from '../AddEntryModal/AddEntryForm';
import { HealthCheckEntry } from '../types';

const PatientPage: React.FC = () => {
  const [{ selectedPatient, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

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

  const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
    try{
      if (!selectedPatient){
        throw new Error('Something weird just happened.');
      }
      const { data: newEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/patients/${selectedPatient.id}/entries`,
        values
      );
      dispatch(addHealthCheckEntry(newEntry));
      closeModal();
    } catch(e){
      console.error(e.response.data);
    }
  }

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
          {diagnoses.find(di => di.code === d.toString())?.name}
          </li>
        ))}</p>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add Entry</Button>
    </div>
  )
}

export default PatientPage