import styled from 'styled-components';
import { useRef, useState } from 'react';
import {
  Avatar,
  IconButton,
} from '@material-ui/core';
import Message from './Message';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { auth, db } from '../firebase';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useRouter } from 'next/router';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);
  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behaviour: 'smooth',
      block: 'start',
    });
  };
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  );

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('users').doc(user.uid).set(
      {
        lastSeen:
          firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .add({
        timestamp:
          firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
      });

    setInput('');
    scrollToBottom();
  };
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(
        (message) => (
          <Message
            key={message.id}
            user={message.data().user}
            message={{
              ...message.data(),
              timestamp: message
                .data()
                .timestamp?.toDate()
                .getTime(),
            }}
          />
        )
      );
    } else {
      return JSON.parse(messages).map(
        (message) => (
          <Message
            key={message.id}
            user={message.user}
            message={message}
          />
        )
      );
    }
  };
  const recipientEmail = getRecipientEmail(
    chat.users,
    user
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection('users')
      .where(
        'email',
        '==',
        getRecipientEmail(chat.users, user)
      )
  );

  const recipient =
    recipientSnapshot?.docs?.[0]?.data();

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo
                  datetime={recipient?.lastSeen?.toDate()}
                />
              ) : (
                'unavailable'
              )}
            </p>
          ) : (
            <p>loading last active</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <Input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
        />
        <button
          hidden
          disabled={!input}
          type="submit"
          onClick={sendMessage}>
          Send message
        </button>
        <IconButton>
          <MicIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  flex: 1;
  margin-left: 15px;

  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  position: sticky;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
