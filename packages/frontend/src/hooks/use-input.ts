import { useReducer } from 'react';

const initialState = {
  value: '',
  isTouched: false,
};

type ACTIONTYPE =
  | { type: 'INPUT'; payload: string }
  | { type: 'BLUR' }
  | { type: 'RESET' };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  if (action.type === 'INPUT') {
    return {
      value: action.payload,
      isTouched: state.isTouched,
    };
  }

  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  if (action.type === 'RESET') {
    return initialState;
  }

  return initialState;
}

function useInput(
  validate: (value: string, validatorArgs: any) => boolean,
  defaultValue = '',
  validatorArgs = {},
) {
  const [inputState, dispatch] = useReducer(reducer, {
    ...initialState,
    value: defaultValue,
  });

  const isValueValid = validate(inputState.value, validatorArgs);
  const hasErrors = inputState.isTouched && !isValueValid;

  const inputChangeHandler = (value: string) => {
    dispatch({ type: 'INPUT', payload: value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const inputResetHandler = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: isValueValid,
    hasErrors,
    inputChangeHandler,
    inputBlurHandler,
    inputResetHandler,
  };
}

export default useInput;
