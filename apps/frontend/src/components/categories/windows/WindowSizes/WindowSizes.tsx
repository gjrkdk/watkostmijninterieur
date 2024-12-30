import { useFormContext } from "../../../../context/FormContext";
import { Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl } from "@mui/material";
import { windowSizes } from "../../../../context/initialRoomState";

export const WindowSizes = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

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
      <Typography variant="h6">Select sizes for each window</Typography>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room) => (
          <Box key={room.id}>
            <Typography variant="subtitle1">{room.label}</Typography>
            {Array.from({
              length: parseInt(
                room.amountWindows?.find((window) => window.isSelected)?.amount || "0",
              ),
            }).map((_, windowIndex) => (
              <FormControl key={windowIndex}>
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
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}
          </Box>
        ))}
    </Box>
  );
};
