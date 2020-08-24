import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { useStateValue } from '../state';

import { HealthCheckEntry, HealthCheckRatingOptions, HealthCheckRating } from '../types';
import { TextField, DiagnosisSelection, NumberField, EntrySelectField } from '../AddPatientModal/FormField';

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry ,'id'>;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

const ratingOptions: HealthCheckRatingOptions[] = [
  { value: HealthCheckRating.Healthy, label: 'healty' },
  { value: HealthCheckRating.LowRisk, label: 'low risk' },
  { value: HealthCheckRating.HighRisk, label: 'high risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'critical risk'}
];

export const AddHealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        specialist: '',
        description: '',
        date: '',
        healthCheckRating: HealthCheckRating.Healthy,
        diagnosisCodes: undefined
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]:string} = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
      }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return(
            <Form className="form ui">
              <Field
                label="specialist"
                placeholder="specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="description"
                placeholder="description"
                name="description"
                component={TextField}
              />
              <Field
                label="date"
                placeholder="date"
                name="date"
                component={TextField}
              />
              <EntrySelectField
                label="healthCheckRating"
                name="healthCheckRating"
                options={ratingOptions}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Grid>
                <Grid.Column floated='left' width={5}>
                  <Button type='button' onClick={onCancel} color='red'>
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated='right' width={5}>
                  <Button type='submit' floated='right' color='green' disabled={!dirty || !isValid}>
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          )
        }}

      </Formik>
  )
}