import React, { useContext } from "react";
import { Questions } from "../../../../translations/questions";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FormContext } from "../../../../context/FormContext";

export const AmountWindows = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

  const handleChange = (roomIndex: number) => (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updateRooms = [...prevValues.rooms];
      updateRooms[roomIndex] = {
        ...updateRooms[roomIndex],
        amountWindows: value,
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

  const noCurtainsOrInbetweens = selectedFormValues.rooms
    .map((room, index) => ({ ...room, index: index }))
    .filter(
      (room) =>
        room.windowDecoration !== "Curtains" &&
        room.windowDecoration !== "Inbetweens" &&
        room.windowDecoration !== "No window decoration needed",
    );

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
      <Typography variant="h1">{Questions[10].text}</Typography>
      {noCurtainsOrInbetweens.map((room, filteredRoomIndex) => (
        <FormControl key={filteredRoomIndex}>
          <FormLabel>{room.name}</FormLabel>
          <Select value={room.amountWindows || "0"} onChange={handleChange(room.index)}>
            {Questions[10].options.map((amountWindows, roomIndex) => (
              <MenuItem key={roomIndex} value={amountWindows}>
                {amountWindows}
              </MenuItem>
            ))}
          </Select>
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
