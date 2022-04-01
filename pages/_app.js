import '../styles/globals.css';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './Login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      db.collection('user').doc(user.uid).set(
        {
          email: user.email,
          lastSeen:
            firebase.firestore.FieldValue.serverTimestamp(),

          photoUrl: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);
  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
