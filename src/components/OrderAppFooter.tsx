import { Box } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { setThemes } from "../store/slice/appSlice"
import { Theme } from "../types/app"

const OrderAppFooter = () => {

    return(
        <Box sx={{
            height: 50,
            width: "100vw",
            bgcolor: "primary.main",
            position: "fixed",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            cursor: "pointer",
            zIndex: 5,
            color: "info.main"
          }}>
            This is order app footer
        </Box>
    )
}

export default OrderAppFooter