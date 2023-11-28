import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Paper, Typography } from '@mui/material'
import { useAuth } from 'oidc-react'

interface Comments {
  id: string;
  userId: string;
  title: string;
  body: string;
}

const CommentList: FC<{ noteId:number }> = ({ noteId }) => {
  const auth = useAuth()
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    if (auth && auth.userData?.id_token) {
      const fetchComments = async () => {
        const res = await fetch(`https://ctsandbox.innohub.app/comments?noteId=${noteId}`, {
          headers: {
            Authorization: `Bearer ${auth.userData?.id_token}`,
          },
        });
        const data = await res.json();
        setComments(data);
      };
      fetchComments();
      const updateComments = () => {
        fetchComments();
      };
      document.addEventListener('updateCommentList', updateComments);
      return () => {
        document.removeEventListener('updateCommentList', updateComments);
      };
    }
  }, [auth, noteId]);

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Link href={`/note/${noteId}/comment/${comment.id}`} key={comment.id}>
            <Paper elevation={6}>
              <Typography>{comment.body}</Typography>
            </Paper>
          </Link>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </Container>
  )
}

export default CommentList