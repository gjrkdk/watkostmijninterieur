import { useFormContext } from "../../../../context/FormContext";
import { Box, FormControl, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { curtainInbetweenSizes } from "../../../../context/initialRoomState";

export const CurtainSizes = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

  const handleChange = (roomIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log("value", value, "roomIndex:", roomIndex);
    setSelectedFormValues((prevValues) => {
      const updatedRooms = [...prevValues.rooms];
      const room = updatedRooms[roomIndex];
      const updatedCurtainInbetweenSizes = room.curtainInbetweenSizes?.map((size) => {
        if (size.label === value) {
          return { ...size, isSelected: true };
        }
        return { ...size, isSelected: false };
      });
      updatedRooms[roomIndex] = { ...room, curtainInbetweenSizes: updatedCurtainInbetweenSizes };
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h6">Select one of the most common curtain or inbetween width</Typography>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room, roomIndex) => (
          <FormControl key={room.id}>
            <Typography variant="subtitle1">{room.label}</Typography>
            <RadioGroup
              value={room.curtainInbetweenSizes?.find((size) => size.isSelected)?.label || ""}
              onChange={handleChange(roomIndex)}
            >
              {curtainInbetweenSizes.map((curtainInbetweenSize, index) => (
                <FormControlLabel
                  key={index}
                  value={curtainInbetweenSize.label}
                  control={<Radio />}
                  label={curtainInbetweenSize.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
    </Box>
  );
};
