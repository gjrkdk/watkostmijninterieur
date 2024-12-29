import { useFormContext } from "../../../../context/FormContext";
import { Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl } from "@mui/material";
import { Questions } from "../../../../translations/questions";

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
        .map((room, roomIndex) => (
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
                  onChange={handleChange(roomIndex, windowIndex)}
                >
                  {Questions[11].options.map((windowSize, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={windowSize}
                      control={<Radio />}
                      label={windowSize}
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

// import React, { useContext } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import { Questions } from "../../../../translations/questions";
// import { FormContext } from "../../../../context/FormContext";

// export const WindowSizes = () => {
//   const formContext = useContext(FormContext);
//   if (!formContext) {
//     return null;
//   }

//   const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

//   const handleChange =
//     (roomIndex: number, windowIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
//       const { value } = event.target;
//       console.log("value", value, "roomIndex:", roomIndex, "windowIndex:", windowIndex);
//       setSelectedFormValues((prevValues) => {
//         const updateRooms = [...prevValues.rooms];
//         const room = updateRooms[roomIndex];
//         const windowSizes = room.windowSizes || [];
//         windowSizes[windowIndex] = value;
//         updateRooms[roomIndex] = { ...room, windowSizes };
//         return { ...prevValues, rooms: updateRooms };
//       });
//     };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleNext = () => {
//     if (containsCurtainsInbetween) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 2);
//     }
//   };

//   const noCurtainsOrInbetweens = selectedFormValues.rooms
//     .map((room, index) => ({ ...room, index: index }))
//     .filter(
//       (room) =>
//         room.windowDecoration !== "Curtains" &&
//         room.windowDecoration !== "Inbetweens" &&
//         room.windowDecoration !== "No window decoration needed",
//     );

//   const containsCurtainsInbetween = selectedFormValues.rooms.every(
//     (room) =>
//       room.windowDecoration === "Curtains" ||
//       room.windowDecoration === "Inbetweens" ||
//       room.windowDecoration === "No window decoration needed",
//   );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         overflow: "auto",
//         height: "100%",
//       }}
//     >
//       <Typography variant="h1">{Questions[11].text}</Typography>
//       {noCurtainsOrInbetweens.map((room, filteredIndex) => (
//         <FormControl key={filteredIndex}>
//           <Typography variant="subtitle1">{room.name}</Typography>
//           {Array.from({ length: parseInt(room.amountWindows || "0") }).map((_, windowIndex) => (
//             <Box key={windowIndex}>
//               <Typography variant="subtitle1">{`Window ${windowIndex + 1}`}</Typography>
//               <RadioGroup
//                 name={`windowSizes-${filteredIndex}-${windowIndex}`}
//                 value={room.windowSizes?.[windowIndex] || ""}
//                 onChange={handleChange(room.index, windowIndex)}
//               >
//                 {Questions[11].options.map((windowSize, optionIndex) => (
//                   <FormControlLabel
//                     key={optionIndex}
//                     control={<Radio />}
//                     label={windowSize}
//                     value={windowSize}
//                   />
//                 ))}
//               </RadioGroup>
//             </Box>
//           ))}
//         </FormControl>
//       ))}
//       <Box
//         sx={{
//           display: "flex",
//           width: "100%",
//           marginTop: "auto",
//           justifyContent: "space-between",
//         }}
//       >
//         <Button variant="contained" color="primary" size="medium" onClick={handleBack}>
//           Back
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ marginLeft: "auto" }}
//           onClick={handleNext}
//         >
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };
