import { useContext, useState } from 'react';
import React from 'react';

export const AppContext = React.createContext({});
export const useGlobalContext = () =>
  useContext(AppContext);
export default AppContext;
