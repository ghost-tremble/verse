import '../styles/globals.css';
import { useEffect, useState } from 'react';
import {
  lightTheme,
  darkTheme,
  GlobalStyles,
} from '../ThemeCofig';
import Loading from '../components/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './Login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { ThemeProvider } from 'styled-components';

import AppContext, {
  useGlobalContext,
} from '../context/GlobalContext';
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    theme == 'light'
      ? setTheme('dark')
      : setTheme('light');
  };
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
  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
      }}>
      {/* <ThemeProvider
        theme={
          theme == 'light'
            ? lightTheme
            : darkTheme
        }> */}
      <GlobalStyles />
      <Component
        {...pageProps}
        toggleMode={toggleTheme}
      />
      ;{/* </ThemeProvider> */}
    </AppContext.Provider>
  );
}
export default MyApp;
