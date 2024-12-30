import { useFormContext } from "../../../../context/FormContext";
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from "@mui/material";

export const Rooms = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.label === name) {
          return { ...room, isSelected: checked };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h6">Which room do you like to decorate?</Typography>
      {selectedFormValues.rooms.map((room) => (
        <FormControl key={room.id}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={room.isSelected} onChange={handleChange} name={room.label} />
              }
              label={room.label}
            />
          </FormGroup>
        </FormControl>
      ))}
    </Box>
  );
};
