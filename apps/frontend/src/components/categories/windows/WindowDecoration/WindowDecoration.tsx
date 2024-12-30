import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";

export const WindowDecoration = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

  const handleChange = (roomLabel: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.label === roomLabel) {
          const updatedWindowDecoration = room.windowDecoration?.map((decoration) => ({
            ...decoration,
            isSelected: decoration.label === value,
          }));
          return {
            ...room,
            windowDecoration: updatedWindowDecoration,
          };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h6">Which window decoration would you like to choose?</Typography>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room) => (
          <FormControl key={room.id}>
            <FormLabel>{room.label}</FormLabel>
            <RadioGroup
              value={room.windowDecoration?.find((d) => d.isSelected)?.label || ""}
              onChange={handleChange(room.label)}
            >
              {room.windowDecoration?.map((decoration) => (
                <FormControlLabel
                  key={decoration.id}
                  value={decoration.label}
                  control={<Radio />}
                  label={decoration.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
    </Box>
  );
};
