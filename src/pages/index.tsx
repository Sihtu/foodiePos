import { Box, Button, Fade, Grow, Typography } from "@mui/material";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Review from "../components/Review";
import BaseFooter from "../components/BaseFooter";

const Home = () => {
  return (
    <Box sx={{ bgcolor: "#ededed" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: -10,
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: 30 }}>
        <Grow in={true} timeout={1000}>{ <Typography sx={{ fontSize: 17 }}>
            Manage Your Menu Category with Foodie Pos and Serve your customer
            <br></br> with foodie pos QR Code Table
          </Typography>}</Grow>
         

          <Box sx={{ display: "flex",justifyContent: "center",  mt: 10 }}>
          <Fade in={true} timeout={1000}>{<Box sx={{ display: "flex",justifyContent: "center",  mt: 10 }}><Box sx={{ mr: 5 }}>
              <Button variant="contained" href="/backoffice">
                Backoffice App
              </Button>
            </Box>
            <Box>
              <Button variant="contained" href="/order?tableId=1">
                Order App
              </Button>
            </Box></Box>}</Fade>
            
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 20 }}>
        <Footer />
      </Box>
      <Box>
        <Review />
      </Box>
      <BaseFooter />
    </Box>
  );
};

export default Home;
