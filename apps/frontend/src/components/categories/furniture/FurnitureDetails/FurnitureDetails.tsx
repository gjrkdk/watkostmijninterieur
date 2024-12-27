// import React, { useContext } from "react";
// import { Questions } from "../../../../translations/questions";
// import {
//   Box,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
//   Button,
//   Typography,
// } from "@mui/material";
// import { FormContext } from "../../../../context/FormContext";

// export const FurnitureDetails = () => {
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
//         furnitureDetails: value,
//       };
//       return { ...prevValues, rooms: updateRooms };
//     });
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const selectedFurniture = selectedFormValues.rooms.filter((room) => room.furniture);
//   console.log("selectedFurniture", selectedFurniture);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "start",
//         gap: 2,
//         overflow: "auto",
//         height: "100%",
//       }}
//     >
//       <Typography variant="h1">{Questions[14].text}</Typography>
//       {selectedFormValues.rooms.map((room, roomIndex) => (
//         <FormControl key={roomIndex}>
//           <FormLabel>{room.name}</FormLabel>
//           {Questions[14].options.map((option, index) => (
//             <RadioGroup
//               key={index}
//               value={room.furnitureDetails || ""}
//               onChange={handleChange(roomIndex)}
//             >
//               <FormControlLabel value={option} control={<Radio />} label={option} />
//             </RadioGroup>
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
//         <Button variant="contained" color="primary" onClick={handleBack} size="medium">
//           Back
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleNext}
//           sx={{ marginLeft: "auto" }}
//         >
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };
