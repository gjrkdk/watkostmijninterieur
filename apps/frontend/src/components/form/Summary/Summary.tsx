// import React, { useContext } from "react";
// import { Box, Typography } from "@mui/material";
// import { FormContext } from "../../../context/FormContext";

// export const Summary = () => {
//   const formContext = useContext(FormContext);

//   if (!formContext) {
//     return null;
//   }

//   return (
//     <>
//       {formContext.selectedFormValues.rooms.map((room, index) => (
//         <Box key={index}>
//           <Typography variant="body2" fontWeight="bold">
//             {room.name}
//           </Typography>
//           <Typography variant="body2">
//             <Box component="span" fontWeight="bold">
//               Floor:{" "}
//             </Box>
//             {room.floor}
//           </Typography>
//           <Typography variant="body2">
//             <Box component="span" fontWeight="bold">
//               Room Size:{" "}
//             </Box>
//             {room.roomSize}
//           </Typography>
//           <Typography variant="body2">
//             <Box component="span" fontWeight="bold">
//               Window Decoration:{" "}
//             </Box>
//             {room.windowDecoration}
//           </Typography>
//           {room.windowDecorationDetails && (
//             <Typography variant="body2">
//               <Box component="span" fontWeight="bold">
//                 Window Decoration Details:{" "}
//               </Box>
//               {room.windowDecorationDetails}
//             </Typography>
//           )}
//           <Typography variant="body2">
//             <Box component="span" fontWeight="bold">
//               Amount of Windows:{" "}
//             </Box>
//             {room.amountWindows}
//           </Typography>
//           <Typography variant="body2">
//             <Box component="span" fontWeight="bold">
//               Window Sizes:{" "}
//             </Box>
//             {room.windowSizes?.join(", ") || "No window sizes selected"}
//           </Typography>
//           <Typography variant="body2">
//             <Box component="span" fontWeight="bold">
//               Furniture:{" "}
//             </Box>
//             {room.furniture?.join(", ") || "No furniture selected"}
//           </Typography>
//           {room.furnitureDetails && (
//             <Typography variant="body2">
//               <Box component="span" fontWeight="bold">
//                 Furniture Details:{" "}
//               </Box>
//               {room.furnitureDetails}
//             </Typography>
//           )}
//         </Box>
//       ))}
//     </>
//   );
// };
