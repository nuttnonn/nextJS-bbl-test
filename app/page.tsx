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
  authority: 'https://dev-yg.us.auth0.com/authorize',
  clientId: 'H9F6QG5SzTKMv0tbmgxLj9LjG1EKVllA',
  responseType: 'code',
  redirectUri: 'http://localhost:3000/',
  scope: 'openid profile email offline_access',
  audience: 'https://dev-yg.us.auth0.com/api/v2/',
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