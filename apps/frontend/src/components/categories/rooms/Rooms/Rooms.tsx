import React, { useContext } from "react";
import { Questions } from "../../../../translations/questions";
import {
  Box,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { FormContext } from "../../../../context/FormContext";

export const Rooms = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedFormValues((prevValues) => {
      let updateRooms = [];
      if (checked) {
        updateRooms = [...prevValues.rooms, { name }];
      } else {
        updateRooms = prevValues.rooms.filter((room) => room.name !== name);
      }
      return { ...prevValues, rooms: updateRooms };
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
      <Typography variant="h1">{Questions[0].text}</Typography>
      {Questions[0].options.map((room, index) => {
        const isSelected = selectedFormValues.rooms.some((r) => r.name === room);
        return (
          <FormControl key={index}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={isSelected} onChange={handleChange} name={room} />}
                label={room}
              />
            </FormGroup>
          </FormControl>
        );
      })}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "auto",
          justifyContent: "space-between",
        }}
      >
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
