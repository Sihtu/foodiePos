import { Avatar, Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const BaseFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: "green",
        height: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "cent er",
        mt: 20
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100%", }}
      >
        <Typography
          sx={{
            width: 150,
            fontSize: 13,
            color: "white"
          }}
        >
          Thayetchaung Township, Kyaunk Myaung Ward contant@ 1234567890 email:
          sithuzaw1800@gmail.com
        </Typography>
        <Box>
          <Avatar
            alt="Remy Sharp"
            src="/Logo.png"
            sx={{ width: 70, height: 70 }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Link
            href={"/backoffice"}
            style={{ color: "white", textDecoration: "none" }}
          >
            Backoffice
          </Link>
          <Link
            href={"/order"}
            style={{ color: "white", textDecoration: "none" }}
          >
            Order App
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default BaseFooter;
