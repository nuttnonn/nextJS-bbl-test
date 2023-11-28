import React, { FC } from 'react'
import { Button, Container } from '@mui/material'
import { useAuth } from 'oidc-react'

const Create: FC<{ title:string, url:string, noteId?:number }> = ({ title, url, noteId }) => {
  const auth = useAuth();
  const handleAddNote = async () => {
    let title = prompt('Please enter title of a new note:', '');
    let body = prompt('Please enter body of a new note:', '');
    if (auth && auth.userData?.id_token) {
      if (title !== '' && body !== '') {
        const response = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.userData?.id_token}`,
          },
          body: JSON.stringify({
            title: title,
            body: body,
          }),
        });
        if (response.ok) {
          const noteListEvent = new CustomEvent('updateNoteList');
          document.dispatchEvent(noteListEvent);
        } else {
          console.error('Failed to add note!');
        }
      } else {
        alert('Failed to add note!\nTitle and body fields must not be empty.');
      }
    }
  };

  const handleAddComment = async () => {
    let body = prompt('Please enter body of a new note:', '');
    if (auth && auth.userData?.id_token) {
      if (body !== '') {
        const response = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.userData?.id_token}`,
          },
          body: JSON.stringify({
            noteId: noteId,
            body: body,
          }),
        });
        if (response.ok) {
          const updateEvent = new CustomEvent('updateCommentList');
          document.dispatchEvent(updateEvent);
        } else {
          console.error('Failed to add comment!');
        }
      } else {
        alert('Failed to add comment!\nBody field must not be empty.');
      }
    }
  };

  const handleCreate = () => {
    title === 'note' ? handleAddNote() : handleAddComment();
  }

  return (
    <Container>
      <Button variant="outlined" onClick={handleCreate}>Create a new {title}</Button>
    </Container>
  );
};

export default Create;