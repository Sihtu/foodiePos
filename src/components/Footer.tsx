import { Box, Grow } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const Footer = () => {
  const footerImage = [
    {
      id: 1,
      image: <MenuBookIcon sx={{ fontSize: {xs: "40px",md:"70px"}, color: "primary.main" }} />,
      lable: "Easily Manage Your Menu with Foodie Pos",
    },
    {
      id: 2,
      image: <QrCode2Icon sx={{ fontSize:{xs: "40px",md:"70px"}, color: "primary.main" }} />,
      lable: "Scan and Order. Quick and Easy. Your Customer will Love it",
    },
    {
      id: 3,
      image: (
        <LocationOnIcon sx={{ fontSize: {xs: "40px",md:"70px"}, color: "primary.main" }} />
      ),
      lable: "Foodie Pos Support multiple Location Your Bussiness.",
    },
    {
      id: 4,
      image: (
        <ChecklistRtlIcon sx={{ fontSize: {xs: "40px",md:"70px"}, color: "primary.main" }} />
      ),
      lable: "Backoffice and order app are include every subscription",
    },
    {
      id: 5,
      image: (
        <SupportAgentIcon sx={{ fontSize: {xs: "40px",md:"70px"}, color: "primary.main" }} />
      ),
      lable: "We are always be here for you.",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection : {xs: "column",md: "row"},
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {footerImage.map((item) => {
        return (
          <Box sx={{ mb: 10}} key={item.id}>
            <Grow in={true} timeout={1000}>
              {
                <Box>
                  <Box
                    sx={{
                      fontSize: {xs: "small", md: "large"},
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {item.image}
                  </Box>
                  <Box sx={{fontSize: {xs: "12px", md: "20px"}, width: "100%", m : 1, display: "flex", justifyContent : "space-around"}}>{item.lable}</Box>
                </Box>
              }
            </Grow>
          </Box>
        );
      })}
    </Box>
  );
};

export default Footer;
