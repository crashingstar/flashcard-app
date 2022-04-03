import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import FirstComponent from './component/FirstComponent';
import UserComponent from './component/UserComponent';
import Login from './component/LoginComponent';
import Register from './component/RegisterComponent';
import './index.css';


ReactDOM.render(
  /*
  <div>
    <FirstComponent />,
    <UserComponent name="John Doe" age={26} address="87 Summer St, Boston, MA 02110" dob={new Date()} />,
  </div>,
  */
  <React.StrictMode>
    <Register />
  </React.StrictMode>,
  document.getElementById('root')
);