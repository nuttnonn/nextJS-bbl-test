'use client'

import React from 'react'
import { Container, Stack, Typography } from '@mui/material'
import NoteList from '@/components/NoteList'
import Create from '@/components/Create'

const Home = () => {

  return (
    <Container sx={{width:{xs:'98%', sm:'90%'}, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#dee2e6', paddingY: 4, marginY: 3, borderRadius: 4}}>
      <Stack justifyContent='space-between' alignItems='center' sx={{ flexDirection:{xs:'column', sm:'row'}, marginBottom:{xs:1, sm:2} }}>
        <Typography variant='h4' fontWeight='bolder' sx={{textDecorationColor: '#212529'}}>All Notes</Typography>
        <Create title="note" url="https://ctsandbox.innohub.app/notes/" />
      </Stack>
      <NoteList />
    </Container>
  )
}

export default Home