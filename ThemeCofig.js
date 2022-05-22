import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  text: '#363537',
  background: '#363537',
  border: '#363537',
};
export const darkTheme = {
  body: 'black',
  text: '#bacbb8',
  toggleBorder: '#c4c4c4',
  background: '',
};
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.10s linear;
  }
`;
