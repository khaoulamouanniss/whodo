import React, {useState} from 'react';
 
export default function Login(props) {
  const{login, error} = props;

  const [details, setDetails] = useState({email:"", password:""})

  const submitHandler = event => {
    event.preventDefault();
    console.log("details from Login component",details)
    login(details);
  };

  return (
    <form onSubmit={submitHandler}>
      Login<br /><br />
      {(error !== "") ? (<div>{error}</div>) : "" }
      <div>
        Email<br />
        <input type="email" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <input type="submit" value ="Login"></input>
      </div>
    </form>
  );
}
