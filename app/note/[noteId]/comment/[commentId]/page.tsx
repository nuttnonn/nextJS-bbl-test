'use client'

import { Container } from '@mui/material'
import Delete from '@/components/Delete'
import Comment from '@/components/Comment'
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

export default function Page({ params }: { params: { commentId: number } }) {
  return (
    <AuthProvider {...oidcConfig}>
      <Container>
        <Comment commentId={params.commentId} />
        <Delete title="Delete comment" url="https://ctsandbox.innohub.app/comments/" id={params.commentId} comment />
      </Container>
    </AuthProvider>
  )
}