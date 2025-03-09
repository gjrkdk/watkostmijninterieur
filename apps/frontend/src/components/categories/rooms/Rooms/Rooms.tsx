import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
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
      <FormControl error={!!error.rooms} variant="standard">
        {selectedFormValues.rooms.map((room) => (
          <FormGroup key={room.id}>
            <FormControlLabel
              className={room.isSelected ? "MuiFormControlLabel-selected" : ""}
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
