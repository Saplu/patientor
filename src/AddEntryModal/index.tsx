import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

import  { AddHealthCheckEntryForm, HealthCheckEntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose:() => void;
  onSubmit:(values: HealthCheckEntryFormValues) => void;
  error? : string;
}

const AddEntryModal = ({ modalOpen, onClose, error, onSubmit } : Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add new Health Check Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">${error}</Segment>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;