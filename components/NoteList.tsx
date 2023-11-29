'use client'

import React, { FC, useEffect, useState } from 'react'
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useAuth } from 'oidc-react'

interface Notes {
  id: string;
  userId: string;
  title: string;
  body: string;
}

const NoteList: FC = () => {
  const auth = useAuth();
  const [notes, setNotes] = useState<Notes[]>([]);

  useEffect(() => {
    if (auth && auth.userData?.id_token) {
      const fetchNotes = async () => {
        const res = await fetch(`https://ctsandbox.innohub.app/notes`, {
          headers: {
            Authorization: `Bearer ${auth.userData?.id_token}`
          },
        });
        const data = await res.json();
        setNotes(data);
      };
      fetchNotes();

      const updateNotes = () => {
        fetchNotes();
      };

      document.addEventListener('updateNoteList', updateNotes);
      return () => {
        document.removeEventListener('updateNoteList', updateNotes);
      };
    }
  }, [auth]);

  return (
    <Stack gap={2}>
      {notes.length > 0 ? (
        notes.map((note) => (
          <Link href={`/note/${note.id}`} key={note.id}>
            <Paper elevation={4} sx={{display:'flex', flexDirection:'column', alignItems:'start', paddingX:1}}>
              <Typography variant="caption" style={{color:'#9da399'}} sx={{marginLeft:2, marginTop:1}}>NOTE {note.id}</Typography>
              <Divider variant="middle" flexItem />
              <Typography variant="subtitle1" sx={{marginLeft:2, marginY:1}}>{note.title}</Typography>
            </Paper>
          </Link>
        ))
      ) : (
        <p>No notes available</p>
      )}
    </Stack>
  );
};

export default NoteList;
