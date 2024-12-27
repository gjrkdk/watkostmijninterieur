import { steps } from "../steps/steps";
import { useFormContext } from "../../../context/FormContext";

export const MultiStep = () => {
  const { activeStep, setActiveStep } = useFormContext();

  if (steps.length === 0) {
    return <div>Error: No steps available</div>;
  }

  const safeActivesStep = Math.min(activeStep, steps.length - 1);

  if (safeActivesStep < 0 || safeActivesStep >= steps.length) {
    return <div>Error: Invalid step</div>;
  }

  const StepComponent = steps[safeActivesStep].component;

  if (!StepComponent) {
    return <div>Error: No component found</div>;
  }

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep(Math.max(activeStep - 1, 0));
  };

  return (
    <div>
      <StepComponent />
      <button onClick={handlePreviousStep}>Previous</button>
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

// import { useContext } from "react";
// import { Box, Paper } from "@mui/material";
// import {
//   Rooms,
//   Floors,
//   RoomSizes,
//   WindowDecoration,
//   WindowDecorationDetails,
//   AmountWindows,
//   WindowSizes,
//   CurtainSizes,
//   Furniture,
// } from "../../categories/index";
// import { Contact } from "../Contact/Contact";
// import { FormContext } from "../../../context/FormContext";
// import { Confirmation } from "../Confirmation/Confirmation";
// import { FurnitureDetails } from "../../categories/furniture/FurnitureDetails/FurnitureDetails";

// export const Steps = () => {
//   const formContext = useContext(FormContext);

//   if (!formContext) {
//     return null;
//   }

//   const { activeStep } = formContext;

//   const renderStepContent = (step: number) => {
//     switch (step) {
//       case 1:
//         return <Rooms />;
//       case 2:
//         return <Floors />;
//       case 3:
//         return <RoomSizes />;
//       case 4:
//         return <WindowDecoration />;
//       case 5:
//         return <WindowDecorationDetails />;
//       case 6:
//         return <AmountWindows />;
//       case 7:
//         return <WindowSizes />;
//       case 8:
//         return <CurtainSizes />;
//       case 9:
//         return <Furniture />;
//       case 10:
//         return <FurnitureDetails />;
//       case 11:
//         return <Contact />;
//       case 12:
//         return <Confirmation />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <Paper
//         sx={{
//           padding: 4,
//           width: "100%",
//           display: "flex",
//           height: 650,
//           flexDirection: "column",
//         }}
//       >
//         {renderStepContent(activeStep)}
//       </Paper>
//     </Box>
//   );
// };
