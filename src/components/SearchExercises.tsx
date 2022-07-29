import { useState, useEffect, FC } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import { Exercise } from '../types/types'
import HorizontalScrollBar from './HorizontalScrollBar'

interface SearchExercisesProps {
    bodyPart: string
    setBodyPart: (bodyPart: string) => void
    setExercises: (exercises: Exercise[]) => void
}

const SearchExercises:FC<SearchExercisesProps> = ({bodyPart, setBodyPart, setExercises}) => {
    const [search, setSearch] = useState<string>("")
    const [bodyParts, setBodyParts] = useState<string[]>([])

    useEffect(() => { 
        const fetchExercisesData = async () => { 
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

            setBodyParts(['all', ...bodyPartsData])
        }

        fetchExercisesData()
    })

    const handleSearch = async () => {
        if (search) {
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

            const searchedExercises = exercisesData.filter(
                (exercise: Exercise) => exercise.name.toLowerCase().includes(search.toLowerCase())
                    || exercise.target.toLowerCase().includes(search)
                    || exercise.equipment.toLowerCase().includes(search)
                    || exercise.bodyPart.toLowerCase().includes(search)
            );

            setSearch("")
            setExercises(searchedExercises)            
        }
    }

  return (
      <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
          <Typography
              fontWeight={700}
              sx={{ fontSize: { lg: "44px", xs: "30px" } }}
              mb="50px"
              textAlign="center">
              Perfect Exercises <br /> For Everyone
          </Typography>
          <Box position="relative" mb="72px">
              <TextField
                  sx={{
                      height: "76px", input: { fontWeight: "700", border: "none", borderRadius: "4px" }, width: { lg: "800px", xs: "350px" },
                      backgroundColor: "#fff",
                      borderRadius:"40px"
                  }}
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase())}
                  placeholder="Search for an exercise"
                  type="text"
              />
              <Button className='search-btn'
                  sx={{
                      bgcolor: "#FF2625",
                      color: "#fff",
                      textTransform: "none",
                      width: { lg: "175px", xs: "80px" },
                      fontSize: { lg: "20px", xs: "14px" },
                      height: "56px",
                      position: "absolute",
                      right: "0",
                  }} onClick={handleSearch}>
                  Search
              </Button>
          </Box>
          <Box sx={{position: 'relative', width: '100%', p: '20px'}}>
              <HorizontalScrollBar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} bodyParts={[]} />
          </Box>
    </Stack>
  )
}

export default SearchExercises