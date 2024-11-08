import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "./firebase/firebase.config";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handelGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  const handelSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {user ? "" : <h1>Login</h1>}

      {user ? <h2>Welcome {user?.displayName}</h2> : <h2>Welcome Guest</h2>}
      {user && (
        <>
          <p>{user?.email}</p>
          <small>
            User Id: {user?.uid.slice(0, 9).concat("*************")}
          </small>{" "}
          <br />
          <img src={user?.photoURL} alt="user profile" />
          <br />
        </>
      )}
      {user ? (
        <button onClick={handelSignOut}>Sign Out</button>
      ) : (
        <button onClick={handelGoogleSignin}>Google Login</button>
      )}

      {/* {user ? (
        <button onClick={handelSignOut}>Sign Out</button>
      ) : (
        <button onClick={handelGoogleSignin}>Google Login</button>
      )} */}

      {/* <button onClick={handelSignOut}>Sign Out</button> */}
    </div>
  );
};

export default Login;
