import React, { useContext } from "react";
import { Questions } from "../../../../translations/questions";
import {
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FormContext } from "../../../../context/FormContext";

export const RoomSizes = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

  const handleChange = (roomIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updateRooms = [...prevValues.rooms];
      updateRooms[roomIndex] = { ...updateRooms[roomIndex], roomSize: value };
      return { ...prevValues, rooms: updateRooms };
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "auto",
        height: "100%",
      }}
    >
      <Typography variant="h1">{Questions[2].text}</Typography>
      {selectedFormValues.rooms.map((room, roomIndex) => (
        <FormControl key={roomIndex}>
          <FormLabel>{room.name}</FormLabel>
          <RadioGroup value={room.roomSize || ""} onChange={handleChange(roomIndex)}>
            {Questions[2].options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </FormControl>
      ))}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "auto",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleBack} size="medium">
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{ marginLeft: "auto" }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
