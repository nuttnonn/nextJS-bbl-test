import React, { FC } from 'react'
import { Button } from '@mui/material'
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
        alert(`Deleted`)
        comment ? router.push(`${notePath}`) : router.push('/')
      } else {
        console.error('Failed to add note');
      }
    }
  }

  return (
    <Button onClick={handleDelete}>
      {title}
    </Button>
  )
}

export default Delete