import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Menu } from "@prisma/client";
import Link from "next/link";
import PaidIcon from '@mui/icons-material/Paid';

interface Props {
  menu: Menu;
  href: string;
  isAvailable?: boolean;
}

const MenuCard = ({ href, menu, isAvailable }: Props) => {
  return (
    <Box sx={{p: 1.5}}>
      <Link href={href} style={{textDecoration: "none "}}>
        <Card
          sx={{
            width: { xs: 150, sm: 200 },
            height: { xs: 150, sm: 230 },
            pb: { xs: 2, sm: 2 },
            opacity: isAvailable === false ? 0.4 : 1,
          }}
        >
          <CardActionArea>
            <CardMedia
            sx={{height: {xs: 100, sm: 140}}}
              component="img"
              image={menu.assetUrl || "undefindImage.jpn"}
              alt="green iguana"
            />
            <CardContent sx={{display: "flex",flexDirection: "column", justifyContent: "center", p: {xs: 1, sm: 2}}}>
                
              <Typography sx={{fontSize: {xs: 16, sm: 18}}}>
                {menu.name}
              </Typography>
              <Box sx={{display: "flex", justifyContent: "flex-start"}}>
                <PaidIcon color="success"/>
                <Typography sx={{fontWeight: "bold"}}>
                    {menu.price}
                </Typography>

              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Box>
  );
};

export default MenuCard;
