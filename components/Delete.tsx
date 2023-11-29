'use client'

import React, { FC, useState } from 'react'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from 'oidc-react'

const Delete: FC<{ title:string, url:string, id:number, comment?:boolean }> = ({ title, url, id, comment}) => {
  const auth = useAuth();
  const router = useRouter();
  const notePath = usePathname().split('/comment')[0];

  const handleDelete = async () => {
    if (auth && auth.userData?.id_token) {
      const response = await fetch(`${url}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.userData.id_token}`,
        },
      });

      if (response.ok) {
        alert(`Successfully deleted`)
        comment ? router.push(`${notePath}`) : router.push('/')
      } else {
        console.error('Failed to add note');
      }
    }
  }

  return (
    <Box>
      <Button variant='outlined' color='error' onClick={handleDelete}>
        {title}
      </Button>
    </Box>
  )
}

export default Delete