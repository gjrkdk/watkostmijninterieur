import React, { useContext } from "react";
import { Questions } from "../../../../translations/questions";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { FormContext } from "../../../../context/FormContext";

interface IFurnitureQualityProps {
  roomName: string;
}

export const FurnitureQuality: React.FC<IFurnitureQualityProps> = ({ roomName }) => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { selectedFormValues, setSelectedFormValues } = formContext;

  const handleChange = (roomName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.name === roomName) {
          return { ...room, furnitureDetails: value };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  const currentRoom = selectedFormValues.rooms.find((room) => room.name === roomName);
  if (!currentRoom) {
    return null;
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>Select the furniture quality</FormLabel>
        <RadioGroup value={currentRoom.furnitureDetails || ""} onChange={handleChange(roomName)}>
          {Questions[14].options.map((furnitureDetails, furnitureQualityIndex) => (
            <FormControlLabel
              key={furnitureQualityIndex}
              control={<Radio />}
              label={furnitureDetails}
              value={furnitureDetails}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
