import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@mui/material";

export const Floors = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

  const handleChange = (roomLabel: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.label === roomLabel) {
          const updatedFloors = room.floors.map((floor) => ({
            ...floor,
            isSelected: floor.label === value,
          }));
          return { ...room, floors: updatedFloors };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room) => (
          <FormControl key={room.id} error={!!error.floors} variant="standard">
            <FormLabel>{room.label}</FormLabel>
            <RadioGroup
              aria-label={room.label}
              value={room.floors.find((f) => f.isSelected)?.label || ""}
              onChange={handleChange(room.label)}
            >
              {room.floors.map((floor) => (
                <FormControlLabel
                  key={floor.id}
                  value={floor.label}
                  control={<Radio />}
                  label={floor.label}
                  className={floor.isSelected ? "MuiFormControlLabel-selected" : ""}
                />
              ))}
            </RadioGroup>
            {error.floors && <FormHelperText>{error.floors}</FormHelperText>}
          </FormControl>
        ))}
    </Box>
  );
};
