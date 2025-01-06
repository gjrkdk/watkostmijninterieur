import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  FormControl,
  FormLabel,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export const AmountWindows = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

  const handleChange = (roomId: number) => (event: SelectChangeEvent) => {
    const selectedAmount = event.target.value;

    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            amountWindows: room.amountWindows?.map((window) => ({
              ...window,
              isSelected: window.amount === selectedAmount,
            })),
          };
        }
        return room;
      });

      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h1">How many windows do you want to decorate?</Typography>
      {selectedFormValues.rooms
        .filter(
          (room) =>
            room.isSelected &&
            room.windowDecoration?.some(
              (decoration) =>
                decoration.isSelected &&
                decoration.label !== "Curtains" &&
                decoration.label !== "Inbetweens",
            ),
        )
        .map((room) => (
          <FormControl key={room.id} error={!!error.amountWindows}>
            <FormLabel>{room.label}</FormLabel>
            <Select
              value={room.amountWindows?.find((window) => window.isSelected)?.amount || ""}
              onChange={handleChange(room.id)}
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <em>Select amount</em>;
                }
                return selected;
              }}
            >
              <MenuItem disabled value="">
                <em>Select amount</em>
              </MenuItem>
              {room.amountWindows?.map((window) => (
                <MenuItem key={window.id} value={window.amount}>
                  {window.amount}
                </MenuItem>
              ))}
            </Select>
            {error.amountWindows && <FormLabel>{error.amountWindows}</FormLabel>}
          </FormControl>
        ))}
    </Box>
  );
};
