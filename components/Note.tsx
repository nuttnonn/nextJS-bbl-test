'use client'

import React, { FC, useEffect, useState } from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useAuth } from 'oidc-react'
import Delete from '@/components/Delete'

interface Note {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Note: FC<{ noteId:number }> = ({ noteId}) => {
  const auth = useAuth();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (auth && auth.userData?.id_token) {
    const fetchNote = async () => {
      const res = await fetch(`https://ctsandbox.innohub.app/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${auth.userData?.id_token}`
        },
      });
      const data = await res.json();
      setNote(data);
    };
    fetchNote();
    }
  }, [auth]);

  return (
    <Box>
      {note ? (
        <Stack direction='column'>
          <Stack justifyContent='space-between' alignItems='center' sx={{ flexDirection:{xs:'column', sm:'row'}, marginBottom:{xs:1, sm:2} }}>
            <Typography variant='h6' style={{color:'#8b8c89'}}>NOTE {note.id}</Typography>
            <Delete title="Delete note" url="https://ctsandbox.innohub.app/notes/" id={note.id} />
          </Stack>
          <Typography variant='h5' marginBottom={1}>{note.title}</Typography>
          <Typography variant='body2'>{note.body}</Typography>
        </Stack>
      ) : (
        <Typography>Note {noteId} not found</Typography>
      )}
    </Box>
  );
};

export default Note;