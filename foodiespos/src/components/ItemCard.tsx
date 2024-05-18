import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  icon: any;
  title: string;
  href: string;
}

const ItemCard = ({ icon, title, href }: Props) => {
  return (
    <Box>
      <Link href={href} style={{ textDecoration: "none" }}>
        <Paper elevation={2} sx={{ width: 220, height: 200, display: "flex", bgcolor: "#DDDDDD" }}>
          <Box sx={{p: 1}}>
            <Box sx={{ display: "flex", p: 1, alignItems: "center" , justifyContent: "center"}}>{icon}</Box>
            <Typography sx={{ display: "flex", p: 1, alignItems: "center" , justifyContent: "center"}}>{title}</Typography>
          </Box>
        </Paper>
      </Link>
    </Box>
  );
};

export default ItemCard;
