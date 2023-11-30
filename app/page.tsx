'use client'

export const runtime = 'edge'

import Home from '@/components/Home'
import Login from '@/components/Login'
import { AuthProvider } from 'oidc-react'

const oidcConfig = {
  authority: process.env.NEXT_PUBLIC_OIDC_AUTHORITY,
  clientId: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID,
  responseType: process.env.NEXT_PUBLIC_OIDC_RESPONSE_TYPE,
  redirectUri: process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI,
  scope: 'openid profile email offline_access',
  audience: process.env.NEXT_PUBLIC_OIDC_AUDIENCE,
};

export default function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <div className="py-10">
        <Home />
        <Login />
      </div>
    </AuthProvider>
  )
}