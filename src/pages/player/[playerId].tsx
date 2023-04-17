
import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

const Player:FC<any> = () => {
  const router = useRouter();
  const { playerId } = router.query;

  return (
    <div>Player: {playerId}</div>
  )
}

export default Player