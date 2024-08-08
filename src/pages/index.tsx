import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Box>

      <Typography variant="h4">Landing Site(Staging)</Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link href={"/backoffice"}>
          <Typography variant="h5">Back Office</Typography>
        </Link>
        <Link href={"/order"}>
          <Typography variant="h5">Order</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
