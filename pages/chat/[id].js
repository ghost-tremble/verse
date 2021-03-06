import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { auth, db } from '../../firebase';
import ChatScreen from '../../components/ChatScreen';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from '../../components/Sidebar';
const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>
          Chat with{' '}
          {getRecipientEmail(chat.users, user)}
        </title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen
          chat={chat}
          messages={messages}
        />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

// server side rendering
export async function getServerSideProps(
  context
) {
  const ref = db
    .collection('chats')
    .doc(context.query.id);
  //prep

  const messageRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp
        .toDate()
        .getTime(),
    }));
  //prep the chat

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scrolll;
  height: 100vh;
  ::webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
