import React, { FC, useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { useAuth } from 'oidc-react'

interface Comment {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Note: FC<{ commentId:number }> = ({ commentId}) => {
  const auth = useAuth();
  const [comment, setComment] = useState<Comment | null>(null);

  useEffect(() => {
    if (auth && auth.userData?.id_token) {
      const fetchComment = async () => {
        const res = await fetch(`https://ctsandbox.innohub.app/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${auth.userData?.id_token}`
          },
        });
        const data = await res.json();
        setComment(data);
      };
      fetchComment();
    }
  }, [auth]);

  return (
    <Container>
      {comment ? (
        <p>{comment.body}</p>
      ) : (
        <p>Comment {commentId} not found</p>
      )}
    </Container>
  );
};

export default Note;