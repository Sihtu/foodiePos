import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAppSelector } from "../store/hook";

const TopBar = () => {
  const {selectedLocation} = useAppSelector((item)=> item.app)
  const { data } = useSession();
  return (
      <AppBar position="static" sx={{ height: "10%", bgcolor: "#627254" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , display: 'flex', justifyContent: "center"}}>
            {selectedLocation?.name}
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
