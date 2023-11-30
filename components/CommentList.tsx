'use client'

import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useAuth } from 'oidc-react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from 'next/navigation'

interface Comments {
  id: string;
  userId: string;
  title: string;
  body: string;
}

const CommentList: FC<{ noteId:number }> = ({ noteId }) => {
  const auth = useAuth()
  const router = useRouter();
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
    <Box>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <List key={noteId}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {router.push(`/note/${noteId}/comment/${comment.id}`)}}>
                <ListItemIcon>
                  <KeyboardArrowRightIcon />
                </ListItemIcon>
                <Stack direction='column'>
                  <Typography variant='subtitle2' style={{color:'#00000080'}}>{`Comment ${comment.id}`}</Typography>
                  <ListItemText primary={comment.body} style={{color:'#343a40'}} />
                </Stack>
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" flexItem />
          </List>
        ))
      ) : (
        <Typography variant='subtitle1'>No comments available</Typography>
      )}
    </Box>
  )
}

export default CommentList