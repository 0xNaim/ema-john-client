import { useContext, useState } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { userContext } from "../../App";
import {
  createUserWithEmailAndPassword,
  handleFbLogin,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photoURL: "",
    success: false,
    error: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    if (newUser && email && password) {
      createUserWithEmailAndPassword(name, email, password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }

    if (!newUser && email && password) {
      signInWithEmailAndPassword(email, password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const fbLogin = () => {
    handleFbLogin().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      setUser(res);
      setLoggedInUser(res);
    });
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      );
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 5;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      <button onClick={fbLogin}>Sign in using Facebook</button>
      {user.isSignedIn && (
        <div>
          <img
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "100%",
              marginTop: "30px",
            }}
            src={user.photoURL}
            alt=""
          />
          <p> Welcome, {user.name} </p>
          <p> Email: {user.email} </p>
        </div>
      )}

      <h3>Our Own Authentication</h3>
      <input
        onChange={() => setNewUser(!newUser)}
        type="checkbox"
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">Account Registration</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            onBlur={handleBlur}
            type="text"
            name="name"
            placeholder="Your name"
          />
        )}
        <br />
        <input
          onBlur={handleBlur}
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <br />
        <input
          onBlur={handleBlur}
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "logged in"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
