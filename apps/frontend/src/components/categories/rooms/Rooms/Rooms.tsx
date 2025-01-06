import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
  styled,
} from "@mui/material";

const CustomFormGroup = styled(FormGroup)({
  border: "1px solid #e0e0e0",
  borderRadius: "15px",
  boxShadow: "0 2px 6px 0px rgba(8, 15, 52, 0.08)",
  marginTop: "10px",
  padding: "10px",
});

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
      <Typography variant="h1">Which room do you like to decorate?</Typography>
      <FormControl error={!!error.rooms} variant="standard">
        {selectedFormValues.rooms.map((room) => (
          <CustomFormGroup key={room.id}>
            <FormControlLabel
              control={
                <Checkbox checked={room.isSelected} onChange={handleChange} name={room.label} />
              }
              label={room.label}
            />
          </CustomFormGroup>
        ))}
        {error.rooms && <FormHelperText>{error.rooms}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
