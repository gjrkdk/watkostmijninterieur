import React, { useContext } from "react";
import { Questions } from "../../../../translations/questions";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Typography,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FormContext } from "../../../../context/FormContext";

export const WindowDecorationDetails = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

  const handleChange = (roomIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updateRooms = [...prevValues.rooms];
      updateRooms[roomIndex] = {
        ...updateRooms[roomIndex],
        windowDecorationDetails: value,
      };
      return { ...prevValues, rooms: updateRooms };
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getQuestions = (windowDecoration: string) => {
    switch (windowDecoration) {
      case "Curtains":
        return Questions[7];
      case "Wooden Blinds":
        return Questions[6];
      case "Aluminum Blinds":
        return Questions[5];
      case "Duet Curtains":
        return Questions[8];
      case "Pleated Curtains":
        return Questions[9];
      case "Inbetweens":
        return Questions[4];
      case "No window decoration needed":
        return null;
      default:
        return null;
    }
  };

  console.log(selectedFormValues);

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
      {selectedFormValues.rooms
        .filter((room) => room.windowDecoration !== "No window decoration needed")
        .map((room, roomIndex) => (
          <FormControl key={roomIndex}>
            <Typography variant="body1">{room.name}</Typography>
            <FormLabel>{room.windowDecoration}</FormLabel>
            <RadioGroup
              value={room.windowDecorationDetails || ""}
              onChange={handleChange(roomIndex)}
            >
              {getQuestions(room.windowDecoration || "")?.options.map((option, index) => (
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
        <Button variant="contained" color="primary" size="medium" onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "auto" }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
