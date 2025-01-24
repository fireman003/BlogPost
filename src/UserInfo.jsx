import { useEffect, useState } from "react";
import BP from "./assets/BP.png";
import {auth} from "./firebase";
import { signOut } from "firebase/auth";

function UserInfo(props) {
    const [username, setUsername] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const [isNull, setIsNull] = useState(false);

    useEffect(() => {
        // get user info from APi
        fetch(`http://localhost:3000/API/getUsername/${props.uuid}`).then((response) => {
            return response.json();
        }).then((data) => {
            setUsername(data.username);
            setPhotoURL(data.photoURL);

            if(data.photoURL === "" || data.photoURL === null || data.photoURL === "null" || data.photoURL === undefined) {
                
                setIsNull(false);
            }
            else {
                setPhotoURL("https://firebasestorage.googleapis.com/v0/b/blogpostserver.appspot.com/o/" + data.photoURL+ "?alt=media");
                setIsNull(true);
            }
        });
    }, [])

    const logout = () => {
        signOut(auth).then(() => {
            console.log('User signed out');
        }).catch((error) => {
            console.log(error);
        });
    }
  
    return (
    <div className="UserInfo">
        <img src={isNull ? photoURL : BP} alt="User Logo" />
        <div className="Center">
        <p>{username}</p>
        <button onClick={logout}>Logout</button>
        </div>
    </div>
  );
}

export default UserInfo;