import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

export const WindowDecorationDetails = () => {
  const { selectedFormValues, setSelectedFormValues, error } = useFormContext();

  const handleDetailChange =
    (roomLabel: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSelectedFormValues((prevValues) => {
        const updatedRooms = prevValues.rooms.map((room) => {
          if (room.label === roomLabel) {
            const updatedDetails = room.windowDecorationDetails?.map((detail) => ({
              ...detail,
              details: detail.details.map((d) => ({
                ...d,
                isSelected: d.label === value,
              })),
            }));
            return { ...room, windowDecorationDetails: updatedDetails };
          }
          return room;
        });
        return { ...prevValues, rooms: updatedRooms };
      });
    };

  const getRelevantDetails = (room: (typeof selectedFormValues.rooms)[0]) => {
    // Find the selected window decoration for the room
    const selectedWindowDecoration = room.windowDecoration?.find(
      (decoration) => decoration.isSelected,
    );
    if (!selectedWindowDecoration) return [];

    // Filter the relevant details based on the selected decoration's label
    return (
      room.windowDecorationDetails?.filter(
        (detail) => detail.label === selectedWindowDecoration.label,
      ) || []
    );
  };

  return (
    <Box>
      <Typography variant="h1">Window decoration details</Typography>
      <Typography variant="h2">Select details for your window decoration</Typography>
      {selectedFormValues.rooms
        .filter((room) =>
          room.windowDecoration?.some(
            (decoration) =>
              decoration.isSelected && decoration.label !== "No window decoration needed",
          ),
        )
        .map((room) => (
          <Box key={room.id}>
            {getRelevantDetails(room).map((detail) => (
              <FormControl
                key={detail.id}
                error={!!error.windowDecorationDetails}
                variant="standard"
              >
                <FormLabel>{room.label}</FormLabel>
                <Typography variant="h4" sx={{ marginBottom: "10px" }}>
                  {detail.label}
                </Typography>
                <RadioGroup
                  aria-label={room.label}
                  value={detail.details.find((d) => d.isSelected)?.label || ""}
                  onChange={handleDetailChange(room.label)}
                >
                  {detail.details.map((subDetail) => (
                    <FormControlLabel
                      key={subDetail.id}
                      value={subDetail.label}
                      control={<Radio />}
                      label={subDetail.label}
                      className={subDetail.isSelected ? "MuiFormControlLabel-selected" : ""}
                    />
                  ))}
                </RadioGroup>
                {error.windowDecorationDetails && (
                  <FormHelperText>{error.windowDecorationDetails}</FormHelperText>
                )}
              </FormControl>
            ))}
          </Box>
        ))}
    </Box>
  );
};
