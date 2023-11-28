'use client'

import { Container } from '@mui/material'
import Delete from '@/components/Delete'
import Comment from '@/components/Comment'
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