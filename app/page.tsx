'use client'

import Home from '@/components/Home'
import Login from '@/components/Login'
import { Container } from '@mui/material'
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

export default function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', bgcolor: '#0a0908', height: '100dvh'}}>
        <Login />
        <Home />
      </Container>
    </AuthProvider>
  )
}