'use client'
import React from 'react'

export const runtime = 'edge';

import { Container, Stack, Typography } from '@mui/material'
import Delete from '@/components/Delete'
import Comment from '@/components/Comment'
import { AuthProvider } from 'oidc-react'

const oidcConfig = {
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
      <Container sx={{width:{xs:'98%', sm:'90%'}, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#dee2e6', paddingY: 4, marginY: 6, borderRadius: 4}}>
        <Stack justifyContent='space-between' alignItems='center' sx={{ flexDirection:{xs:'column', sm:'row'}, marginBottom:{xs:1, sm:2} }}>
          <Typography variant='h6' style={{color:'#8b8c89'}}>COMMENT {params.commentId}</Typography>
          <Delete title="Delete comment" url="https://ctsandbox.innohub.app/comments/" id={params.commentId} comment />
        </Stack>
        <Comment commentId={params.commentId} />
      </Container>
    </AuthProvider>
  )

  // const [isClient, setIsClient] = useState(false)
  // useEffect(() => {
  //   setIsClient(true)
  // }, [])
  //
  // if (isClient) {
  //   return (
  //     <AuthProvider {...oidcConfig}>
  //       <Container>
  //         <Comment commentId={params.commentId} />
  //         <Delete title="Delete comment" url="https://ctsandbox.innohub.app/comments/" id={params.commentId} comment />
  //       </Container>
  //     </AuthProvider>
  //   )
  // } else {
  //   return <h1>wait</h1>
  // }
}