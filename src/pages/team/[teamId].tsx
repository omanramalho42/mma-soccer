import { useRouter } from 'next/router'
import React from 'react'

const teamId = () => {
  const { query: { teamId } } = useRouter()
  

  
  return (
    <div>
      # { teamId }
    </div>
  )
}

export default [teamId]