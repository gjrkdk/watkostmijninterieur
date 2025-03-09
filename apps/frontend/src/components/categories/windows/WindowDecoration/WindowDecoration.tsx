import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

export const WindowDecoration = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

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
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room) => (
          <FormControl key={room.id} error={!!error.windowDecoration} variant="standard">
            <FormLabel>{room.label}</FormLabel>
            <RadioGroup
              aria-label={room.label}
              value={room.windowDecoration?.find((d) => d.isSelected)?.label || ""}
              onChange={handleChange(room.label)}
            >
              {room.windowDecoration?.map((decoration) => (
                <FormControlLabel
                  key={decoration.id}
                  value={decoration.label}
                  control={<Radio />}
                  label={decoration.label}
                  className={decoration.isSelected ? "MuiFormControlLabel-selected" : ""}
                />
              ))}
            </RadioGroup>
            {error.windowDecoration && <FormHelperText>{error.windowDecoration}</FormHelperText>}
          </FormControl>
        ))}
    </Box>
  );
};
