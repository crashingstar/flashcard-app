import React, { useReducer, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LoginReducer, { State } from "../reducers/LoginReducer";

//state type

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

function Login() {
  const [state, dispatch] = useReducer(LoginReducer, initialState);
  const navigate = useNavigate();

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

  const handleLogin = () => {
    var formdata = new FormData();
    formdata.append("username", state.username);
    formdata.append("hashed_password", state.password);
    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch("http://127.0.0.1:5000/user/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code == "Login successfully") {
          dispatch({
            type: "loginSuccess",
            payload: "Login Successfully",
          });
          localStorage.setItem("user_id",result.login_id)
          navigate("/home");
        } else {
          dispatch({
            type: "loginFailed",
            payload: "Incorrect username or password",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
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
          <CardHeader title="Login App" />
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
              onClick={handleLogin}
              disabled={state.isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
        </Card>

        <Button
          color="primary"
          variant="contained"
          size="small"
          href="/register"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default Login;
