import { Box, Button, IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { use, useState } from "react";


interface Props{
    decrease: (data: any)=> void
    increase: (data:any) => void
    number: number
}
const QuantityCounter = ({decrease, increase, number}: Props) => {

 
  
  
  return (
    <Box sx={{display: "flex"}}>
      <IconButton onClick={decrease}>
        <RemoveCircleIcon sx={{ color: "blue" }} />
      </IconButton>
      <Typography sx={{fontSize: 20, mt: 0.6, p: 2}}>{number}</Typography>
      
      <IconButton onClick={increase}>
        <AddCircleIcon sx={{ color: "blue" }} />
      </IconButton>
    </Box>
  );
};

export default QuantityCounter;
