import { FC, useEffect, useState } from 'react'
import { Exercise } from '../types/types'
import  Pagination from '@mui/material/Pagination'
import { Box, Stack, Typography } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import ExerciseCard from './ExerciseCard'
 
interface ExercisesProps {
  bodyPart: string
  exercises: Exercise[]
  setExercises: (exercises: Exercise[]) => void
}

const Exercises: FC<ExercisesProps> = ({ bodyPart, exercises, setExercises }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const exercisesPerPage: number = 9;

  const paginate = (e: React.ChangeEvent<unknown>, value: React.SetStateAction<number>) => {
    setCurrentPage(value)

    window.scrollTo({top: 1800, behavior: 'smooth'})
  }

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if(bodyPart === "all") {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions)
      }

      setExercises(exercisesData)
    }
      fetchExercisesData();
  },[bodyPart])

  const indexOfLastExercise: number = currentPage * exercisesPerPage;

  const indexOfFirstExercise: number = indexOfLastExercise - exercisesPerPage;

  const currentExercises: Exercise[] = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
 
  return (
    <Box id="exercises"
      sx={{ mt: { lg: '110px ' } }}
      mt="50px"
      p="20px"
    >
      <Typography variant='h3' mb="46px">Showing Results</Typography>
      <Stack direction="row" sx={{ gap: { lg: "110px", xs: "50px" } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape='rounded'
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises