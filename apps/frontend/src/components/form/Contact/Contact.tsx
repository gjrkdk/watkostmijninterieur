import { useFormContext } from "../../../context/FormContext";
import { Box, TextField } from "@mui/material";
import { IContactDetails } from "../../../context/FormContext";

export const Contact = () => {
  const { contactDetails, setContactDetails } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    setContactDetails((prevValues: IContactDetails) => ({
      ...prevValues,
      [name]: value,
    }));

    // TODO: Implement validation
    // TODO: Invoke Lambda function to save contact details and send email
  };

  return (
    <Box>
      <TextField
        label="Name"
        name="firstName"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contactDetails.firstName}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contactDetails.email}
        onChange={handleChange}
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
