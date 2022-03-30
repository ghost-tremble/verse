import styled from 'styled-components';
import ChatIcon from '@material-ui/icons/Chat';
import React from 'react';
import { auth, db } from '../firebase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import {
  Avatar,
  Button,
  IconButton,
} from '@material-ui/core';
import * as EmailValidator from 'email-validator';
import Chat from './Chat';
const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);
  const [chatsSnapshot] =
    useCollection(userChatRef);
  const createChat = () => {
    const input = prompt(
      'please enter an email address for the user you wish to chat with'
    );
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // add life chat to side bar

      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  };
  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat
          .data()
          .users.find(
            (user) => user === recipientEmail
          )?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar
          src={user.photoURL}
          onClick={() => auth.signOut()}
        />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chat" />
      </Search>
      <SidebarButton onClick={() => createChat()}>
        Start a new chart
      </SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat
          key={chat.id}
          id={chat.id}
          users={chat.data().users}
        />
      ))}
      {/* list of chats */}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const IconsContainer = styled.div``;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover: {
    opacity: 0.8;
  }
`;

// search

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const SidebarButton = styled(Button)`
width:100%;
    &&&{
        border-top:1px solid whitesmoke
    border-bottom:1px solid whitesmoke
    }
`;
