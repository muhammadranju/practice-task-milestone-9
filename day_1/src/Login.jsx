import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";
import { app } from "./firebase/firebase.config";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  const handelGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handelGithubSignin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handelFacebookSignin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handelTwitterSignin = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handelSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {user ? "" : <h1 className="text-4xl font-bold">Login</h1>}

      {user ? (
        <h2 className="text-2xl font-semibold">Welcome {user?.displayName}</h2>
      ) : (
        <h2 className="text-2xl font-semibold">Welcome Guest</h2>
      )}
      {user && (
        <div className="">
          <p>{user?.email}</p>
          <small>
            User Id: {user?.uid.slice(0, 9).concat("*************")}
          </small>{" "}
          <img
            className="w-28 rounded-xl"
            src={user?.photoURL}
            alt="user profile"
          />
        </div>
      )}
      {user ? (
        <button
          className="btn w-fit bg-red-500 text-white"
          onClick={handelSignOut}
        >
          Sign Out
        </button>
      ) : (
        <div className="space-x-3 w-fit">
          <button className="btn bg-green-500" onClick={handelGoogleSignin}>
            Google Login
          </button>
          <button
            className="btn w-fit bg-gray-500 text-white"
            onClick={handelGithubSignin}
          >
            Github Login
          </button>
          <button
            className="btn w-fit bg-blue-500 text-white"
            onClick={handelFacebookSignin}
          >
            Facebook Login
          </button>
          <button
            className="btn w-fit bg-sky-500 text-white"
            onClick={handelTwitterSignin}
          >
            Twitter Login
          </button>
        </div>
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
