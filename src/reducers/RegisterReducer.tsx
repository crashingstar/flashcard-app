export type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

export type RegisterAction =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "registerSuccess"; payload: string }
  | { type: "registerFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const RegisterReducer = (state: State, action: RegisterAction): State => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "registerSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "registerFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

export default RegisterReducer;
