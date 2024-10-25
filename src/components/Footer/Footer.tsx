import React, { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import axiosAPI from "../../axiosAPI.ts";

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

const Footer: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axiosAPI.get("/contacts.json");
        if (response.data) {
          setContactInfo(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    void fetchContactInfo();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        padding: 2,
        textAlign: "center",
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
        color: "white",
      }}
    >
      <Typography variant="h5">Contacts:</Typography>
      {contactInfo && (
        <>
          <Typography>
            Email:{" "}
            <Link href={`mailto:${contactInfo.email}`} color="inherit">
              {contactInfo.email}
            </Link>
          </Typography>
          <Typography>Телефон: {contactInfo.phone}</Typography>
          <Typography>Адрес: {contactInfo.address}</Typography>
        </>
      )}
    </Box>
  );
};

export default Footer;
