import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  // Run after browser load
  useEffect(() => {
    const fetchExerciseData = async () => {
      const bodyPartData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartData]);
    };
    fetchExerciseData();
  }, []);

  // Handle Search function
  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );

      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );

      window.scrollTo({ top: 1800, left: 0, behavior: "smooth" });

      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" mt="37px" p="20px">
      <Typography
        fontWeight={700}
        mb="50px"
        textAlign="center"
        sx={{ fontSize: { lg: "44px", sx: "30px" } }}
      >
        Awesome Exercise You <br /> Shoud Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "950px", sm: "650px", xs: "350px" },
            background: "#ffffff",
            borderRadius: "40px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search Exercises"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#ffffff",
            textTransform: "capitalize",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", sx: "12px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
