'use client'
import { Container, Stack, Typography } from '@mui/material'

export const runtime = 'edge';

import Delete from '@/components/Delete'
import CommentList from '@/components/CommentList'
import Create from '@/components/Create'
import Note from '@/components/Note'
import { AuthProvider } from 'oidc-react'
import React from 'react'

const oidcConfig = {
  authority: process.env.NEXT_PUBLIC_OIDC_AUTHORITY,
  clientId: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID,
  responseType: process.env.NEXT_PUBLIC_OIDC_RESPONSE_TYPE,
  redirectUri: process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI,
  scope: 'openid profile email offline_access',
  audience: process.env.NEXT_PUBLIC_OIDC_AUDIENCE,
};

export default function Page({ params }: { params: { noteId: number } }) {
  return (
    <AuthProvider {...oidcConfig}>
      <div className="py-10">
        <Container sx={{width:{xs:'98%', sm:'90%'}, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#dee2e6', paddingY: 4, marginY: 3, borderRadius: 4}}>
          <Note noteId={params.noteId} />
          <Container sx={{border:1, borderRadius:3, borderColor:'#adb5bd99', paddingX:{xs:0, sm:4}, paddingY:4}}>
            <Stack justifyContent='space-between' alignItems='center' sx={{ flexDirection:{xs:'column', sm:'row'}, marginBottom:{xs:1, sm:2} }}>
              <Typography variant='subtitle1' fontWeight='bold' style={{color:'#343a40'}}>Comments of this note:</Typography>
              <Create title="comment" url="https://ctsandbox.innohub.app/comments" noteId={params.noteId} />
            </Stack>
            <CommentList noteId={params.noteId} />
          </Container>
        </Container>
      </div>
    </AuthProvider>
  )
}