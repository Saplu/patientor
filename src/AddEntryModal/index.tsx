import React from 'react';
import { Modal } from 'semantic-ui-react';

import  { AddHealthCheckEntryForm, HealthCheckEntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose:() => void;
  onSubmit:(values: HealthCheckEntryFormValues) => void; 
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit } : Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add new Health Check Entry</Modal.Header>
    <Modal.Content>
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;