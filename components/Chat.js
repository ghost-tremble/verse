import { Avatar } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import getRecipientEmail from '../utils/getRecipientEmail';
import styled from 'styled-components';
const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db
      .collction('users')
      .where(
        'email',
        '==',
        getRecipientEmail(users, user)
      )
  );
  const recipient =
    getRecipientEmail()?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(
    users,
    user
  );

  console.log(recipientEmail);
  const startChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <Container>
      {recipient ? (
        <UserAvatar src={recipient?.photoUrl} />
      ) : (
        <UserAvatar>
          {recipientEmail[0]}
        </UserAvatar>
      )}

      <p>Recipient Email</p>
    </Container>
  );
};

export default Chat;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
