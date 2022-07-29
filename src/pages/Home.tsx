import { useState } from 'react'
import {Box} from "@mui/material"
import HeroBanner from '../components/HeroBanner'
import SearchExercises from '../components/SearchExercises'
import Exercises from '../components/Exercises'
import { Exercise } from '../types/types'

const Home = () => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [bodyPart, setBodyPart] = useState<string>("all")

  return (
    <Box>
      <HeroBanner />
      <SearchExercises bodyPart={bodyPart} setBodyPart={setBodyPart} setExercises={setExercises} />
      <Exercises bodyPart={bodyPart} exercises={exercises} setExercises={setExercises} />
    </Box>
  )
}

export default Home