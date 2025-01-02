import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
} from "@mui/material";

export const Rooms = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedFormValues((prevValues) => ({
      ...prevValues,
      rooms: prevValues.rooms.map((room) =>
        room.label === name ? { ...room, isSelected: checked } : room,
      ),
    }));
  };

  return (
    <Box>
      <Typography variant="h6">Which room do you like to decorate?</Typography>
      <FormControl error={!!error.rooms}>
        {selectedFormValues.rooms.map((room) => (
          <FormGroup key={room.id}>
            <FormControlLabel
              control={
                <Checkbox checked={room.isSelected} onChange={handleChange} name={room.label} />
              }
              label={room.label}
            />
          </FormGroup>
        ))}
        {error.rooms && <FormHelperText>{error.rooms}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
