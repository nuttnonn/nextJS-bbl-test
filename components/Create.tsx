'use client'

import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Modal, Stack,
  TextField, Typography,
} from '@mui/material'
import { useAuth } from 'oidc-react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Create: FC<{ title:string, url:string, noteId?:number }> = ({ title, url, noteId }) => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setTitleError(false);
    setBodyError(false);
  };

  const handleClose = () => {
    setOpen(false);
    setTitleInput('');
    setBodyInput('')
  };


  const handleAddNote = async () => {
    if (auth && auth.userData?.id_token) {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.userData?.id_token}`,
        },
        body: JSON.stringify({
          title: titleInput,
          body: bodyInput,
        }),
      });
      if (response.ok) {
        setOpenModal(true);
        const noteListEvent = new CustomEvent('updateNoteList');
        document.dispatchEvent(noteListEvent);
      } else {
        console.error('Failed to add note!');
      }
    }
  };

  const handleAddComment = async () => {
    if (auth && auth.userData?.id_token) {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.userData?.id_token}`,
        },
        body: JSON.stringify({
          noteId: noteId,
          body: bodyInput,
        }),
      });
      if (response.ok) {
        setOpenModal(true);
        const updateEvent = new CustomEvent('updateCommentList');
        document.dispatchEvent(updateEvent);
      } else {
        console.error('Failed to add comment!');
      }
    }
  };

  const handleSubmit = () => {
    setTitleError(false)
    setBodyError(false)

    if (titleInput === '') {
      setTitleError(true)
    }
    if (bodyInput === '') {
      setBodyError(true)
    }
    if (title === 'note' && titleInput && bodyInput) {
      handleAddNote();
      handleClose();
    } else if (title === 'comment' && bodyInput) {
      handleAddComment()
      handleClose();
    }
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    paddingY:4,
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a new {title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new {title}</DialogTitle>
        <DialogContent>
          {title === 'note' ?
            <DialogContentText>
            Please enter title and body of a new note.
            </DialogContentText>
            :
            <DialogContentText>
              Please enter body of a new comment.
            </DialogContentText>
          }
          {title === 'note' &&
            <TextField
              onChange={(e) => setTitleInput(e.target.value)}
              required
              multiline
              maxRows={3}
              error={titleError}
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="email"
              fullWidth
              variant="outlined"
            />
          }
          <TextField
            onChange={(e) => setBodyInput(e.target.value)}
            required
            multiline
            rows={4}
            error={bodyError}
            autoFocus
            margin="dense"
            id="name"
            label="Body"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openModal}
        onClose={() => {setOpenModal(false)}}
      >
        <Box sx={style}>
          <Stack direction='row' justifyContent='center' alignItems='center'>
            <CheckCircleOutlineIcon />
            <Typography marginLeft={1}>New {title} was successfully created.</Typography>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Create;