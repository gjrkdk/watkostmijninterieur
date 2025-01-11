import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";

export const Furniture = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

  const handleChange =
    (roomIndex: number, furnitureIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      const selectedFurnitureLabel =
        selectedFormValues.rooms[roomIndex].furniture?.[furnitureIndex].label;

      setSelectedFormValues((prevValues) => {
        const updatedRooms = [...prevValues.rooms];
        const updatedFurniture = updatedRooms[roomIndex].furniture?.map((furniture, index) => {
          if (index === furnitureIndex) {
            return { ...furniture, isSelected: checked };
          } else if (selectedFurnitureLabel === "No furniture" && checked) {
            return { ...furniture, isSelected: false, isDisabled: true };
          } else if (
            selectedFurnitureLabel !== "No furniture" &&
            checked &&
            furniture.label === "No furniture"
          ) {
            return { ...furniture, isSelected: false, isDisabled: true };
          } else {
            return { ...furniture, isDisabled: false };
          }
        });

        updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], furniture: updatedFurniture };
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
                  className={furniture.isSelected ? "MuiFormControlLabel-selected" : ""}
                  control={
                    <Checkbox
                      checked={furniture.isSelected}
                      onChange={handleChange(roomIndex, furnitureIndex)}
                      name={furniture.label}
                      disabled={furniture.isDisabled}
                    />
                  }
                  label={furniture.label}
                />
              </FormGroup>
            ))}
            {error.furniture && <FormHelperText color="error">{error.furniture}</FormHelperText>}
          </FormControl>
        ))}
    </Box>
  );
};
