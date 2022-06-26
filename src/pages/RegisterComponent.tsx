import React, { useReducer, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import RegisterReducer, { State } from "../reducers/RegisterReducer";

//state type

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

const Register = () => {
  const [state, dispatch] = useReducer(RegisterReducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const handleRegister = () => {
    if (state.username !== "abc@email.com") {
      dispatch({
        type: "registerSuccess",
        payload: "Register Successfully",
      });
    } else {
      dispatch({
        type: "registerFailed",
        payload: "Username already exist",
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleRegister();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };
  return (
    <div>
      <form noValidate autoComplete="off">
        <Card>
          <CardHeader title="Register App" />
          <CardContent>
            <div>
              <TextField
                error={state.isError}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={handleUsernameChange}
                onKeyPress={handleKeyPress}
              />
              <TextField
                error={state.isError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={state.helperText}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleRegister}
              disabled={state.isButtonDisabled}
            >
              Register
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default Register;
