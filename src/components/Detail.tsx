import { FC } from 'react'
import { Typography, Stack, Button } from '@mui/material'

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';
import { Exercise } from '../types/types';

interface DetailProps {
    exerciseDetail: Exercise
}

const Detail: FC<DetailProps> = ({ exerciseDetail }) => {
    const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

    const extraDetail = [
        {
            icon: BodyPartImage,
            id: 1,
            name: bodyPart,
        },
        {
            icon: TargetImage,
            id: 2,
            name: target,
        },
        {
            icon: EquipmentImage,
            id:3,
            name: equipment,
        }
    ]
    
  return (
      <Stack gap="60px" sx={{flexDirection: {lg:"row"}, p:"20px", alignItems:'center'}}>
          <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
          <Stack sx={{ gap: { lg:'35px', xs:'20px' } }}>
              <Typography variant='h3'>
                  {name}
              </Typography>
              <Typography variant='h6'>
                  {name} {' '} is a great exercise to work your {target}. Just make sure you're doing it on regular basis.
              </Typography>
              {extraDetail.map((item) => (
                  <Stack key={item.id} direction="row" gap="24px" alignItems="center"> 
                      <Button sx={{ background:"#fff2db", borderRadius:"50%", width:"100px", height:"100px" }}>
                          <img src={item.icon} alt={bodyPart} style={{ width:"50px", height:"50px" }} />
                      </Button>
                      <Typography textTransform="capitalize" variant='h5'>
                          {item.name}
                      </Typography>
                  </Stack>
              ))}
          </Stack>
    </Stack>
  )
}

export default Detail