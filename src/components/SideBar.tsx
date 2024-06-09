import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import TableBarIcon from '@mui/icons-material/TableBar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PostAddIcon from '@mui/icons-material/PostAdd';

const menuItem = [
  { id: 1, name: "menu", route: "/backoffice/menu", icon: <LocalDiningIcon /> },
  {
    id: 2,
    name: "menuCatagory",
    route: "/backoffice/menu-catagory",
    icon: <MenuBookIcon />,
  },
  { id: 3, name: "addon", route: "/backoffice/addon", icon: <WaterDropIcon /> },
  { id: 4, name: "addon-catagory", route: "/backoffice/addon-catagory", icon: <PostAddIcon /> },
  { id: 5, name: "table", route: "/backoffice/table", icon: <TableBarIcon /> },
  { id: 6, name: "order", route: "/backoffice/order", icon: <FoodBankIcon /> },
  { id: 7, name: "location", route: "/backoffice/location", icon: <AddLocationIcon /> }
];
const SideBar = () => {
  return (
    <Box sx={{ bgcolor: "#76885B", height: "100vh", width: 260 }}>
      <List>
        {menuItem.map((item) => (
          <Link key={item.id} href={item.route} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: "#EEEEEE"}}>{item.icon}</ListItemIcon>
                <ListItemText sx={{color: "#EEEEEE"}} primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        <Link href={"/backoffice/setting"} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color: "#EEEEEE"}}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText sx={{color: "#EEEEEE"}} primary={"Setting"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default SideBar;
