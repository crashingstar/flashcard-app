import * as React from "react";
function Logout() {
    React.useEffect(() => {
        localStorage.removeItem("user_id")
      }, []);
  
    return (
      <div>
        You have successfully Logout
      </div>
)}
  
  export default Logout;