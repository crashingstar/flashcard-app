import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
  /*
  <div>
    <FirstComponent />,
    <UserComponent name="John Doe" age={26} address="87 Summer St, Boston, MA 02110" dob={new Date()} />,
  </div>,
  */
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);