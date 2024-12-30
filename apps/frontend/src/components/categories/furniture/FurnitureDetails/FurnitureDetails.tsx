import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export const FurnitureDetails = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

  const handleChange = (roomIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updatedRooms = [...prevValues.rooms];
      const room = updatedRooms[roomIndex];
      const updatedFurnitureDetails = room.furnitureDetails?.map((furnitureDetail) => ({
        ...furnitureDetail,
        isSelected: furnitureDetail.label === value,
      }));
      updatedRooms[roomIndex] = { ...room, furnitureDetails: updatedFurnitureDetails };
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h1">Which furniture details would you like to choose?</Typography>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room, roomIndex) => (
          <FormControl key={room.id}>
            <FormLabel>{room.label}</FormLabel>
            <RadioGroup
              value={room.furnitureDetails?.find((detail) => detail.isSelected)?.label || ""}
              onChange={handleChange(roomIndex)}
            >
              {room.furnitureDetails?.map((furnitureDetail) => (
                <FormControlLabel
                  key={furnitureDetail.id}
                  value={furnitureDetail.label}
                  control={<Radio />}
                  label={furnitureDetail.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
    </Box>
  );
};
