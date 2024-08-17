import { Box, Slide, Typography } from "@mui/material";
import Image from "next/image";

const Header = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column", position: "fixed", top: 0, minHeight: 30, width: "100vw",}}
    >
      <Slide in={true} timeout={1200}>
    {<Box  sx={{ display: "flex", alignItems: "center", flexDirection: "column", position: "fixed", top: 0, minHeight: 30, width: "100vw",}}><Image
        src="/order_app_header.svg"
        alt="header-image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "50%",}}
      />

      <Box sx={{position: "absolute", right: 10, mt: 3}}>
        <Image
          src={"/chef_logo.png"}
          alt="Chef Logo"
          sizes="100vw"
          width={0}
          height={0}
          style={{ height: "auto", width: "100%", }}
        />
      </Box>

      <Typography sx={{ position: "absolute", mt: {xs: 1, md: 4}, fontSize: {xs: 10, md: 30}, color: "black"}}> Foodie Pos</Typography></Box>}
  </Slide>
      
    </Box>
  );
};
export default Header;
