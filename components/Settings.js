import React from 'react';
import Darkmode from '@material-ui/icons/Brightness4';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { useGlobalContext } from '../context/GlobalContext';
const Settings = ({ displayMode }) => {
  const { theme, toggleTheme } =
    useGlobalContext();
  return (
    <Container displayMode={displayMode}>
      <Ul>
        <Li>
          <span
            style={{
              marginRight: 'auto',
            }}>
            Darkmode{' '}
          </span>

          <IconButton
            onClick={() => toggleTheme()}>
            <Darkmode />
          </IconButton>
        </Li>
      </Ul>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  background-color: #fff;
  height: 200px;
  width: 250px;
  display: ${(props) => props.displayMode};
  position: absolute;
  top: 80px;
  right: 0;
  flex-direction: column;
  padding: 10px 0px;
`;

const Ul = styled.div``;
const Li = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;
