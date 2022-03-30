import React from 'react';
import styled from 'styled-components';
import { Head } from 'next/head';
import Sidebar from '../../components/Sidebar';
const Chat = () => {
  return (
    <Container>
      <Head>
        <title>chat</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
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
    .order('timestamp', 'asc').get;
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
