'use client'

import { Container } from '@mui/material'
import Delete from '@/components/Delete'
import CommentList from '@/components/CommentList'
import Create from '@/components/Create'
import Note from '@/components/Note'
import { AuthProvider } from 'oidc-react'

const oidcConfig = {
  onSignIn: async (user: any) => {
    console.log(user)
    window.location.hash = '';
  },
  authority: process.env.NEXT_PUBLIC_OIDC_AUTHORITY,
  clientId: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID,
  responseType: process.env.NEXT_PUBLIC_OIDC_RESPONSE_TYPE,
  redirectUri: process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI,
  scope: process.env.NEXT_PUBLIC_OIDC_SCOPE,
  audience: process.env.NEXT_PUBLIC_OIDC_AUDIENCE,
};

export default function Page({ params }: { params: { noteId: number } }) {
  return (
    <AuthProvider {...oidcConfig}>
      <Container>
        <Note noteId={params.noteId} />
        <Delete title="Delete note" url="https://ctsandbox.innohub.app/notes/" id={params.noteId} />
        <CommentList noteId={params.noteId} />
        <Create title="comment" url="https://ctsandbox.innohub.app/comments" noteId={params.noteId} />
      </Container>
    </AuthProvider>
  )
}