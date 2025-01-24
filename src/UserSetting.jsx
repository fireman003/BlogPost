import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { upload } from "./firebase";

function UserSetting(props) {
  const phone = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const email = useRef();
  const url = useRef();

  const [Url, setUrl] = useState(''); 
  const [x, setX] = useState(Url);
  const [y, setY] = useState(false);
  const [error, setError] = useState(null); 

  const redirect = useNavigate();

  const Submit = async () => {
    if(document.querySelector('input[type="file"]').files.length === 0) { 
      setX(Url);  
    } else {
      setX(await upload(document.querySelector('input[type="file"]').files[0], props.uuid, setUrl))
    }

    setY(true);
  }

  useEffect(() => {
    if(!y) return;
    fetch(`http://localhost:3000/API/updateUser/${props.uuid}/${username.current.value}/${email.current.value}/${firstName.current.value}/${lastName.current.value}/${phone.current.value}/${x}`).then(() => {
      redirect('/');
    });
  }, [x])

  useEffect(() => {
    fetch(`http://localhost:3000/API/getUserData/${props.uuid}`).then((response) => {
      return response.json();
    }).then((data) => {
      phone.current.value = data.phone;
      firstName.current.value = data.firstName;
      lastName.current.value = data.lastName;
      username.current.value = data.username;
      email.current.value = data.email;
      setUrl(data.photoURL);
    });
  }, [])

  return (
    <div className="userSettings">
      <h1>User Setting</h1>
      <p>please complete your informations</p>
      <p className="red">{error}</p>
      <label>Username</label> 
      <input type='text' ref={username}/>
      <label>Email</label>
      <input type='email' readOnly ref={email}/>
      <label>First Name</label>
      <input type='text' ref={firstName}/>
      <label>Last Name</label>
      <input type='text' ref={lastName}/>
      <label>Phone</label>
      <input type='tel' ref={phone}/>

      <label>Profile picture</label>
      <input type='file'ref={url} placeholder='insert your profile picture'/>

      <button onClick={Submit}>Save</button>
    </ div>
  )
}

export default UserSetting;