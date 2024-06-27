import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  icon: any;
  title: string;
  href: string;
  isAvaliable?: boolean;
}

const ItemCard = ({ icon, title, href, isAvaliable }: Props) => {
  return (
    <Box>
      <Link href={href} style={{ textDecoration: "none" }}>
        <Paper
          elevation={2}
          sx={{
            width: 160,
            height: "fit-content",
            display: "flex",
            m: 2,
            bgcolor: "#DDDDDD",
          }}
        >
          <Box
            sx={{
              p: 1,
              width: "100%",
              margin: 1,
              opacity: isAvaliable === false ? 0.4 : 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                p: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
            <Typography
              sx={{
                display: "flex",
                p: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Paper>
      </Link>
    </Box>
  );
};

export default ItemCard;
