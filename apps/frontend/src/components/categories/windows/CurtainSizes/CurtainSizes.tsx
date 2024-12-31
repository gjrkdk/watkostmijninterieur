import { useFormContext } from "../../../../context/FormContext";
import { Box, FormControl, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { curtainInbetweenSizes } from "../../../../context/initialRoomState";

export const CurtainSizes = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

  const handleChange = (roomId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.id === roomId) {
          const updatedCurtainSizes = room.curtainInbetweenSizes?.map((size) =>
            size.label === value ? { ...size, isSelected: true } : { ...size, isSelected: false },
          );
          return { ...room, curtainInbetweenSizes: updatedCurtainSizes };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h6">
        Select one of the most common curtain or inbetween widths
      </Typography>
      {selectedFormValues.rooms
        .filter(
          (room) =>
            room.isSelected &&
            room.windowDecoration?.some(
              (decoration) =>
                decoration.isSelected &&
                (decoration.label === "Curtains" || decoration.label === "Inbetweens"),
            ),
        )
        .map((room) => (
          <FormControl key={room.id}>
            <Typography variant="subtitle1">{room.label}</Typography>
            <RadioGroup
              value={room.curtainInbetweenSizes?.find((size) => size.isSelected)?.label || ""}
              onChange={handleChange(room.id)}
            >
              {curtainInbetweenSizes.map((curtainInbetweenSize) => (
                <FormControlLabel
                  key={curtainInbetweenSize.id}
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
