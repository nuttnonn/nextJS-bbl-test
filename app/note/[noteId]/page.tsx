'use client'

import { Container } from '@mui/material'
import Delete from '@/components/Delete'
import CommentList from '@/components/CommentList'
import Create from '@/components/Create'
import Note from '@/components/Note'
import { AuthProvider } from 'oidc-react'

const oidcConfig = {
  onSignIn: async (user: any) => {
    console.log(user);
    window.location.hash = '';
  },
  authority: 'https://dev-yg.us.auth0.com/authorize',
  clientId: 'H9F6QG5SzTKMv0tbmgxLj9LjG1EKVllA',
  responseType: 'code',
  redirectUri: 'http://localhost:3000/',
  scope: 'openid profile email offline_access',
  audience: 'https://dev-yg.us.auth0.com/api/v2/',
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