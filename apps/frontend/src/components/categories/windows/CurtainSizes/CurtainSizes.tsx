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

// import React, { useContext } from "react";
// import { Questions } from "../../../../translations/questions";
// import {
//   Box,
//   Button,
//   FormControl,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import { FormContext } from "../../../../context/FormContext";

// export const CurtainSizes = () => {
//   const formContext = useContext(FormContext);

//   if (!formContext) {
//     return null;
//   }

//   const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

//   const handleChange = (roomIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     console.log("value", value, "roomIndex:", roomIndex);
//     setSelectedFormValues((prevValues) => {
//       const updateRooms = [...prevValues.rooms];
//       updateRooms[roomIndex] = {
//         ...updateRooms[roomIndex],
//         curtainSize: value,
//       };
//       return { ...prevValues, rooms: updateRooms };
//     });
//   };

//   const handleBack = () => {
//     if (containsWindowDecoration) {
//       setActiveStep((prevActiveStep) => prevActiveStep - 3);
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     }
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const containsWindowDecoration = selectedFormValues.rooms.every(
//     (room) => room.windowDecoration !== "Curtains" || "Inbetweens",
//   );

//   console.log("containsWindowDecoration", containsWindowDecoration);

//   const containsCurtainsInbetweens = selectedFormValues.rooms
//     .map((room, index) => ({ ...room, index }))
//     .filter(
//       (room) => room.windowDecoration === "Curtains" || room.windowDecoration === "Inbetweens",
//     );
//   console.log("containsCurtainsInbetweens", containsCurtainsInbetweens);

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
//       <Typography variant="h1">{Questions[12].text}</Typography>
//       {containsCurtainsInbetweens.map((room, filteredIndex) => (
//         <FormControl key={filteredIndex}>
//           <Typography variant="subtitle1">{room.name}</Typography>
//           <RadioGroup value={room.curtainSize || ""} onChange={handleChange(room.index)}>
//             {Questions[12].options.map((curtainSize, optionIndex) => (
//               <FormControlLabel
//                 key={optionIndex}
//                 value={curtainSize}
//                 control={<Radio />}
//                 label={curtainSize}
//               />
//             ))}
//           </RadioGroup>
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
