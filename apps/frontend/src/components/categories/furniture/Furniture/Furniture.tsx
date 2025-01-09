import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";

export const Furniture = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

  const handleChange =
    (roomIndex: number, furnitureIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setSelectedFormValues((prevValues) => {
        const updatedRooms = [...prevValues.rooms];
        const room = updatedRooms[roomIndex];
        const updatedFurniture = room.furniture?.map((furniture, index) => ({
          ...furniture,
          isSelected: index === furnitureIndex ? checked : furniture.isSelected,
        }));
        updatedRooms[roomIndex] = { ...room, furniture: updatedFurniture };
        return { ...prevValues, rooms: updatedRooms };
      });
    };

  return (
    <Box>
      <Typography variant="h1">Furniture</Typography>
      <Typography variant="h2">Which furniture would you like to choose?</Typography>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room, roomIndex) => (
          <FormControl key={room.id} error={!!error.furniture}>
            <FormLabel>{room.label}</FormLabel>
            {room.furniture?.map((furniture, furnitureIndex) => (
              <FormGroup key={furniture.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={furniture.isSelected}
                      onChange={handleChange(roomIndex, furnitureIndex)}
                      name={furniture.label}
                      className={furniture.isSelected ? "MuiFormControlLabel-selected" : ""}
                    />
                  }
                  label={furniture.label}
                />
              </FormGroup>
            ))}
            {error.furniture && <Typography color="error">{error.furniture}</Typography>}
          </FormControl>
        ))}
    </Box>
  );
};
