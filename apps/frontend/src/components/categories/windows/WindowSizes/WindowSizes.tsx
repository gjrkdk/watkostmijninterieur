import React, { useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Questions } from "../../../../translations/questions";
import { FormContext } from "../../../../context/FormContext";

export const WindowSizes = () => {
  const formContext = useContext(FormContext);
  if (!formContext) {
    return null;
  }

  const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

  const handleChange =
    (roomIndex: number, windowIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      console.log(roomIndex, windowIndex, value);
      setSelectedFormValues((prevValues) => {
        const updateRooms = [...prevValues.rooms];
        const room = updateRooms[roomIndex];
        const windowSizes = room.windowSizes || [];
        windowSizes[windowIndex] = value;
        room.windowSizes = windowSizes;
        updateRooms[roomIndex] = room;
        return { ...prevValues, rooms: updateRooms };
      });
    };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
      <Typography variant="h1">{Questions[11].text}</Typography>
      {selectedFormValues.rooms.map((room, roomIndex) => (
        <FormControl key={roomIndex}>
          <Typography variant="subtitle1">{room.name}</Typography>
          {Array.from({ length: parseInt(room.amountWindows || "0") }).map((_, windowIndex) => (
            <Box key={windowIndex}>
              <Typography variant="subtitle1">{`Window ${windowIndex + 1}`}</Typography>
              <RadioGroup
                name={`windowSizes-${roomIndex}-${windowIndex}`}
                value={room.windowSizes?.[windowIndex] || ""}
                onChange={handleChange(roomIndex, windowIndex)}
              >
                {Questions[11].options.map((windowSize, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    control={<Radio />}
                    label={windowSize}
                    value={windowSize}
                  />
                ))}
              </RadioGroup>
            </Box>
          ))}
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
