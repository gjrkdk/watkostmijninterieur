import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { windowSizes } from "../../../../context/initialRoomState";

export const WindowSizes = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

  const handleChange =
    (roomIndex: number, windowIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSelectedFormValues((prevValues) => {
        const updatedRooms = [...prevValues.rooms];
        const room = updatedRooms[roomIndex];
        const windowSizes = room.windowSizes || [];
        windowSizes[windowIndex] = value;
        updatedRooms[roomIndex] = { ...room, windowSizes };
        return { ...prevValues, rooms: updatedRooms };
      });
    };

  return (
    <Box>
      <Typography variant="h1">Window sizes</Typography>
      <Typography variant="h2">Select sizes for each window</Typography>
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
          <Box key={room.id}>
            <Typography variant="subtitle1">{room.label}</Typography>
            {Array.from({
              length: parseInt(
                room.amountWindows?.find((window) => window.isSelected)?.amount || "0",
              ),
            }).map((_, windowIndex) => (
              <FormControl key={windowIndex} error={!!error.windowSizes}>
                <Typography variant="subtitle1">{`Window ${windowIndex + 1}`}</Typography>
                <RadioGroup
                  value={room.windowSizes?.[windowIndex] || ""}
                  onChange={handleChange(room.id, windowIndex)}
                >
                  {windowSizes.map((windowSizes, index) => (
                    <FormControlLabel
                      key={index}
                      value={windowSizes}
                      control={<Radio />}
                      label={windowSizes}
                      className={
                        windowSizes === room.windowSizes?.[windowIndex]
                          ? "MuiFormControlLabel-selected"
                          : ""
                      }
                    />
                  ))}
                </RadioGroup>
                {error.windowSizes && <FormHelperText>{error.windowSizes}</FormHelperText>}
              </FormControl>
            ))}
          </Box>
        ))}
    </Box>
  );
};
