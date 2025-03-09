import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

export const RoomSizes = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

  const handleChange = (roomLabel: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.label === roomLabel) {
          const updatedRoomSizes = room.roomSizes.map((roomSize) => ({
            ...roomSize,
            isSelected: roomSize.label === value,
          }));
          return { ...room, roomSizes: updatedRoomSizes };
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
          <FormControl key={room.id} error={!!error.roomSizes}>
            <FormLabel>{room.label}</FormLabel>
            <RadioGroup
              aria-label={room.label}
              value={room.roomSizes.find((f) => f.isSelected)?.label || ""}
              onChange={handleChange(room.label)}
            >
              {room.roomSizes.map((roomSize) => (
                <FormControlLabel
                  key={roomSize.id}
                  value={roomSize.label}
                  control={<Radio />}
                  label={roomSize.label}
                  className={roomSize.isSelected ? "MuiFormControlLabel-selected" : ""}
                />
              ))}
            </RadioGroup>
            {error.roomSizes && <FormHelperText>{error.roomSizes}</FormHelperText>}
          </FormControl>
        ))}
    </Box>
  );
};
