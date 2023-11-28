import React, { FC, useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { useAuth } from 'oidc-react'

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
    <Container>
      {note ? (
        <div>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
        </div>
      ) : (
        <p>Note {noteId} not found</p>
      )}
    </Container>
  );
};

export default Note;