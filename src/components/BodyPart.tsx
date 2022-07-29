import React, { FC } from 'react'

import { Stack, Typography } from '@mui/material'
import Icon from '../assets/icons/gym.png'


interface BodyPartProps {
    item: string
    bodyPart: string
    setBodyPart: (bodyPart: string) => void
}

const BodyPart:FC<BodyPartProps> = ({item, bodyPart, setBodyPart}) => {
  return (
    <Stack
      typeof='button'
      alignItems="center"
      justifyContent="center"
      className='bodyPart-card'
      sx={{
        borderTop: bodyPart === item ? '4px solid #ff2625' : '',
        borderBottomLeftRadius: '20px',
        width: '130px',
        height: '140px',
        cursor: 'pointer',
        gap: '47px',
      }}
      onClick={() => {
        setBodyPart(item)
        window.scrollTo({top:1800, left:100, behavior: 'smooth'})
      }}
    >
      <img src={Icon} alt="gym" style={{ width: '40px', height: '40px' }} />
      <Typography fontSize="22px" fontWeight="bold" color="#3A1212" textTransform="capitalize">{item}</Typography>
    </Stack>
  )
}

export default BodyPart