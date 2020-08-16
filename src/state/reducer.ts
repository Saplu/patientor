import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        selectedPatient: action.payload
      }
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]) => {
  const value : Action = {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
  return value;
};

export const setPatient = (patient: Patient) => {
  const value : Action = {
    type: 'SET_PATIENT',
    payload: patient
  };
  return value;
};

export const addPatient = (patient: Patient) => {
  const value : Action = {
    type: 'ADD_PATIENT',
    payload: patient
  };
  return value;
};
