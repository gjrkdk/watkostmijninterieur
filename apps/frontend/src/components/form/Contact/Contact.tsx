import React, { useContext } from "react";
import { FormContext } from "../../../context/FormContext";
import { TextField, Button, Box } from "@mui/material";

export const Contact = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { setActiveStep, selectedFormValues, setSelectedFormValues, errors, setErrors, setPrice } =
    formContext;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelectedFormValues((prevValues) => ({
      ...prevValues,
      contactDetails: {
        ...prevValues.contactDetails,
        [name]: value,
      },
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedFormValues.contactDetails.firstName) {
      newErrors.firstName = "Name is required";
    }
    if (!selectedFormValues.contactDetails.email) {
      newErrors.email = "Email is required";
    }
    if (!selectedFormValues.contactDetails.phone) {
      newErrors.phone = "Phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/price-range`, {
          method: "POST",
          body: JSON.stringify(selectedFormValues),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success:", data);
        setSelectedFormValues(selectedFormValues);
        setPrice(data.total);
        console.log("Total price:", data.total);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "auto",
        height: "100%",
      }}
    >
      <TextField
        label="Name"
        name="firstName"
        variant="outlined"
        fullWidth
        margin="normal"
        value={selectedFormValues.contactDetails.firstName}
        onChange={handleChange}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={selectedFormValues.contactDetails.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Phone"
        name="phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={selectedFormValues.contactDetails.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "auto",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleBack} size="medium">
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: "auto" }}>
          Submit
        </Button>
      </Box>
    </form>
  );
};
