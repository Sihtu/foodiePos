import { Box, Button, Fade, Grow, Typography } from "@mui/material";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Review from "../components/Review";
import BaseFooter from "../components/BaseFooter";

const Home = () => {
  return (
    <Box
      sx={{
        bgcolor: "#ededed",
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        sx={{
          maxWidth: "100%",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 12,
            alignItems: "center",
          }}
        >
          <Grow in={true} timeout={1000}>
            {
              <Typography sx={{ fontSize:{ xs: 12,md:17}, maxWidth: {xs: "65%", md: "100%"} }}>
                Manage Your Menu Category with Foodie Pos and Serve your
                customer
                <br></br> with foodie pos QR Code Table
              </Typography>
            }
          </Grow>

          <Box sx={{ display: "flex", justifyContent: {xs: "space-around",md:"center"}, mt: 10 }}>
            <Fade in={true} timeout={1000}>
              {
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: {xs: 3, md:10},
                  }}
                >
                  <Box sx={{ mr: 5 , mb: {xs: 5},}}>
                    <Button variant="contained" href="/backoffice" sx={{width: {xs: 100, md: 200}, fontSize: {xs: "10px", md: "15px"}}}>
                      Backoffice
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" href="/order?tableId=1" sx={{width: {xs: 100, md: 200}, fontSize: {xs: "10px", md: "15px"}}}>
                      Order App
                    </Button>
                  </Box>
                </Box>
              }
            </Fade>
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
    </Box>
  );
};

export default Home;
