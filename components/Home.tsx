import React from 'react'
import { Container } from '@mui/material'
import NoteList from '@/components/NoteList'
import Create from '@/components/Create'

const Home = () => {

  return (
    <Container>
      <NoteList />
      <Create title="note" url="https://ctsandbox.innohub.app/notes/" />
    </Container>
  )
}

export default Home