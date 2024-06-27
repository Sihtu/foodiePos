import { Box } from "@mui/material";
import { ReactNode } from "react";


interface Props {
    children: ReactNode
}
const OrderApp = ({children} : Props) => {
  return <Box>This is orderApp</Box>;
};

export default OrderApp;
