import React, { useContext } from "react";
import { Questions } from "../../../../translations/questions";
import {
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FormContext } from "../../../../context/FormContext";

export const WindowDecoration = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

  const noWindowDecorationSelected = selectedFormValues.rooms.every(
    (room) => room.windowDecoration === "No window decoration needed",
  );

  const handleChange = (roomIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updateRooms = [...prevValues.rooms];
      updateRooms[roomIndex] = {
        ...updateRooms[roomIndex],
        windowDecoration: value,
      };
      return { ...prevValues, rooms: updateRooms };
    });
  };

  const handleNext = () => {
    if (noWindowDecorationSelected) {
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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
      <Typography variant="h1">{Questions[3].text}</Typography>
      {selectedFormValues.rooms.map((room, roomIndex) => (
        <FormControl key={roomIndex}>
          <FormLabel>{room.name}</FormLabel>
          <RadioGroup value={room.windowDecoration || ""} onChange={handleChange(roomIndex)}>
            {Questions[3].options.map((option, index) => (
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
