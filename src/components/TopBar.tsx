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
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
}
const TopBar = ({value, setValue}: Props) => {
  const { selectedLocation } = useAppSelector((item) => item.app);
  const { data } = useSession();
  return (
    <AppBar position="static" sx={{ height: "10%" }}>
      <Toolbar>
        <Typography onClick={()=> value === true?setValue(false): setValue(true)}><MenuIcon /></Typography>
        
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
        >
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
