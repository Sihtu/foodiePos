import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SingIn = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            signIn("google", { callbackUrl: "/backoffice" });
          }}
        >
          Sing In With Google
        </Button>
      </Box>
    </Box>
  );
};

export default SingIn;
