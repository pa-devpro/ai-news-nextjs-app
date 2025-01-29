import { FormState } from '@/features/auth/types/definitions';

export const initialFormState: FormState = {
  user: undefined,
  errors: undefined,
};

export type RegisteringSuccess = {
  type: 'REGISTER_SUCCESS';
  payload: {
    id: string;
    name?: string | null | undefined;
    email: string | null | undefined;
  };
};

export type RegisteringError = {
  type: 'REGISTER_ERROR';
  payload: {
    name?: string[];
    email?: string[];
    password?: string[];
    message?: string;
  } | null;
};

export type Action = RegisteringSuccess | RegisteringError;

export function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return { ...state, user: action.payload, errors: undefined };
    case 'REGISTER_ERROR':
      return {
        ...state,
        user: undefined,
        errors: action.payload as RegisteringError['payload'],
      };
    default:
      return state;
  }
}
