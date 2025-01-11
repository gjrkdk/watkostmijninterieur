import { useFormContext } from "../../../context/FormContext";
import { Box, TextField, Typography } from "@mui/material";
import { IContactDetails } from "../../../context/FormContext";

export const Contact = () => {
  const { contactDetails, setContactDetails, error } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    setContactDetails((prevValues: IContactDetails) => ({
      ...prevValues,
      [name]: value,
    }));

    // TODO: Invoke Lambda function to save contact details and send email
  };

  return (
    <Box>
      <Typography variant="h1">Contact Details</Typography>
      <Typography variant="h2" sx={{ marginTop: "10px" }}>
        Please fill the form below to receive a price estimation
      </Typography>
      <TextField
        label="Name"
        name="firstName"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contactDetails.firstName}
        onChange={handleChange}
        error={!!error.firstName}
        helperText={error.firstName}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contactDetails.email}
        onChange={handleChange}
        error={!!error.email}
        helperText={error.email}
      />
      <TextField
        label="Phone"
        name="phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contactDetails.phone}
        onChange={handleChange}
      />
    </Box>
  );
};
