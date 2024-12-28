import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";

export const WindowDecorationDetails = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

  const handleChange = (roomLabel: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.label === roomLabel) {
          const updatedDetails = room.windowDecorationDetails?.map((detail) => ({
            ...detail,
            isSelected: detail.label === value,
          }));
          return { ...room, windowDecorationDetails: updatedDetails };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h6">Select details for your window decoration</Typography>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room) => (
          <Box key={room.id}>
            <Typography variant="subtitle1">{room.label}</Typography>
            {room.windowDecorationDetails
              ?.filter(
                (detail) =>
                  room.windowDecoration?.find((d) => d.isSelected)?.label === detail.label,
              )
              .map((detail) => (
                <FormControl key={detail.id}>
                  <FormLabel>{detail.label}</FormLabel>
                  <RadioGroup
                    value={detail.details.find((d) => d.isSelected)?.label || ""}
                    onChange={handleChange(room.label)}
                  >
                    {detail.details.map((subdetail) => (
                      <FormControlLabel
                        key={subdetail.id}
                        value={subdetail.label}
                        control={<Radio />}
                        label={subdetail.label}
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
// import { Questions } from "../../../../translations/questions";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   Typography,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import { FormContext } from "../../../../context/FormContext";

// export const WindowDecorationDetails = () => {
//   const formContext = useContext(FormContext);

//   if (!formContext) {
//     return null;
//   }

//   const { setActiveStep, selectedFormValues, setSelectedFormValues } = formContext;

//   const handleChange = (roomIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     setSelectedFormValues((prevValues) => {
//       const updateRooms = [...prevValues.rooms];
//       updateRooms[roomIndex] = {
//         ...updateRooms[roomIndex],
//         windowDecorationDetails: value,
//       };
//       return { ...prevValues, rooms: updateRooms };
//     });
//   };

//   const handleNext = () => {
//     if (containsCurtainsInbetween) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 3);
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const getQuestions = (windowDecoration: string) => {
//     switch (windowDecoration) {
//       case "Curtains":
//         return Questions[7];
//       case "Wooden Blinds":
//         return Questions[6];
//       case "Aluminum Blinds":
//         return Questions[5];
//       case "Duet Curtains":
//         return Questions[8];
//       case "Pleated Curtains":
//         return Questions[9];
//       case "Inbetweens":
//         return Questions[4];
//       case "No window decoration needed":
//         return null;
//       default:
//         return null;
//     }
//   };

//   const containsCurtainsInbetween = selectedFormValues.rooms.every(
//     (room) =>
//       room.windowDecoration === "Curtains" ||
//       room.windowDecoration === "Inbetweens" ||
//       room.windowDecoration === "No window decoration needed",
//   );
//   console.log("containsCurtainsOrInbetweens", containsCurtainsInbetween);

//   const onlyWindowDecoration = selectedFormValues.rooms
//     .map((room, index) => ({ ...room, index: index }))
//     .filter((room) => room.windowDecoration !== "No window decoration needed");
//   console.log(onlyWindowDecoration);

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
//       <Typography variant="h1">Make a selection</Typography>
//       {onlyWindowDecoration.map((room, roomIndex) => (
//         <FormControl key={roomIndex}>
//           <FormLabel>{getQuestions(room.windowDecoration || "")?.text}</FormLabel>
//           <RadioGroup
//             value={room.windowDecorationDetails || ""}
//             onChange={handleChange(room.index)}
//           >
//             {getQuestions(room.windowDecoration || "")?.options.map((option, index) => (
//               <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
//             ))}
//           </RadioGroup>
//         </FormControl>
//       ))}
//       {/* {selectedFormValues.rooms
//         .filter((room) => room.windowDecoration !== "No window decoration needed")
//         .map((room, roomIndex) => (
//           <FormControl key={roomIndex}>
//             <FormLabel>{getQuestions(room.windowDecoration || "")?.text}</FormLabel>
//             <RadioGroup
//               value={room.windowDecorationDetails || ""}
//               onChange={handleChange(roomIndex)}
//             >
//               {getQuestions(room.windowDecoration || "")?.options.map((option, index) => (
//                 <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         ))} */}
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
