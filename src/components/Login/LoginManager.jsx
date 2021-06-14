import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase.config';

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photoURL: photoURL,
        success: true,
      };
      setUserToken();
      return signInUser;
    })
    .catch((err) => {
      const { errorCode, errorMsg } = err;
      console.log(errorCode, errorMsg);
    });
};

const setUserToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      sessionStorage.setItem('token', idToken);
    })
    .catch(function (error) {
      // Handle error
    });
};

export const handleFbLogin = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      // var credential = result.credential;
      var user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      console.log(errorCode, errorMessage);
      var credential = error.credential;
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photoURL: '',
        success: false,
      };
      return signOutUser;
    })
    .catch((err) => {
      const { errorCode, errorMsg } = err;
      console.log(errorCode, errorMsg);
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log('Username updated successfully');
    })
    .catch((error) => {
      console.log(error.message);
    });
};
