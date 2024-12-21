import React, { useContext } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Button,
} from "@mui/material";
import { Questions } from "../../../../translations/questions";
import { FormContext } from "../../../../context/FormContext";
import { FurnitureQuality } from "../FurnitureQuality/FurnitureQuality";

export const Furniture: React.FC = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

  const handleChange = (roomName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.name === roomName) {
          let updatedFurniture = room.furniture || [];
          if (name === "No furniture" && checked) {
            updatedFurniture = ["No furniture"];
          } else if (checked) {
            updatedFurniture = updatedFurniture.filter((item) => item !== "No furniture");
            updatedFurniture.push(name);
          } else {
            updatedFurniture = updatedFurniture.filter((item) => item !== name);
          }
          return { ...room, furniture: updatedFurniture };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
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
      <Typography variant="h1">{Questions[13].text}</Typography>
      {selectedFormValues.rooms.map((room, roomIndex) => (
        <FormControl key={roomIndex}>
          <FormLabel>{`Select the furniture for ${room.name}`}</FormLabel>
          <FormGroup>
            {Questions[13].options.map((furniture, furnitureIndex) => (
              <FormControlLabel
                key={furnitureIndex}
                label={furniture}
                control={
                  <Checkbox
                    name={furniture}
                    checked={room.furniture?.includes(furniture) || false}
                    onChange={handleChange(room.name)}
                  />
                }
              />
            ))}
          </FormGroup>
          {!room.furniture?.includes("No furniture") &&
            room.furniture &&
            room.furniture.length > 0 && <FurnitureQuality roomName={room.name} />}
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
