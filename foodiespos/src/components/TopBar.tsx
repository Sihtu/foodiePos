import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const TopBar = () => {
  const { data } = useSession();
  return (
      <AppBar position="static" sx={{ height: "10%", bgcolor: "#627254" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FoodiesPos
          </Typography>
          {data && (
            <Button color="inherit" onClick={() => signOut()}>
              Sing Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    
  );
};

export default TopBar;
