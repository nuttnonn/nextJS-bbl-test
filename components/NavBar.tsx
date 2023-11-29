'use client'

import React from 'react'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import CabinIcon from '@mui/icons-material/Cabin';
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/')
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton onClick={handleClick} size='large' edge='start' color='inherit' aria-label='logo' sx={{ mr:2 }}>
          <CabinIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow:1 }}>
          BBL APP
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar