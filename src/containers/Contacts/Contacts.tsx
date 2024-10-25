import { Typography, Button, TextField, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosAPI from "../../axiosAPI.ts";
import Loader from "../../components/Loader/Loader.tsx";

const initialForm = { email: "", phone: "", address: "" };

const Contacts = () => {
  const [contacts, setContacts] = useState(initialForm);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axiosAPI.get(`/contacts.json`);
        if (response.data) {
          setContacts(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    void fetchContacts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContacts({ ...contacts, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosAPI.put(`/contacts.json`, contacts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (loading) return <Loader />;

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contact Information
      </Typography>
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={contacts.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={contacts.phone}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={contacts.address}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            required
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              "& strong": { fontSize: "18px", marginRight: "10px" },
            }}
          >
            <strong>Email:</strong>
            {contacts.email}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              "& strong": { fontSize: "18px", marginRight: "10px" },
            }}
          >
            <strong>Phone:</strong>
            {contacts.phone}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              "& strong": { fontSize: "18px", marginRight: "10px" },
            }}
          >
            <strong>Address:</strong>
            {contacts.address}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Contacts;
