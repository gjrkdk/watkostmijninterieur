// import React, { useContext } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   FormControl,
//   FormControlLabel,
//   Checkbox,
//   FormGroup,
//   FormLabel,
// } from "@mui/material";
// import { Questions } from "../../../../translations/questions";
// import { FormContext } from "../../../../context/FormContext";

// export const Furniture = () => {
//   const formContext = useContext(FormContext);

//   if (!formContext) {
//     return null;
//   }

//   const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

//   const handleChange = (roomIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = event.target;
//     setSelectedFormValues((prevValues) => {
//       const updateRooms = [...prevValues.rooms];
//       const room = updateRooms[roomIndex];
//       if (checked) {
//         room.furniture = room.furniture ? [...room.furniture, name] : [name];
//       } else {
//         room.furniture = room.furniture?.filter((f) => f !== name);
//       }
//       updateRooms[roomIndex] = room;
//       return { ...prevValues, rooms: updateRooms };
//     });
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleNext = () => {
//     if (noFurnitureSelected) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 2);
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const noFurnitureSelected = selectedFormValues.rooms.every((room) =>
//     room.furniture?.includes("No furniture"),
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
//       <Typography variant="h1">{Questions[13].text}</Typography>
//       {selectedFormValues.rooms.map((room, roomIndex) => (
//         <FormControl key={roomIndex}>
//           <FormLabel>{room.name}</FormLabel>
//           <FormGroup>
//             {Questions[13].options.map((furniture, index) => {
//               const isSelected = room.furniture?.some((f) => f === furniture) || false;
//               return (
//                 <FormControl key={index}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={isSelected}
//                         onChange={handleChange(roomIndex)}
//                         name={furniture || ""}
//                       />
//                     }
//                     label={furniture}
//                   />
//                 </FormControl>
//               );
//             })}
//           </FormGroup>
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
