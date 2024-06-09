import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SingIn = () => {
  return (
    <BackOfficeLayout>
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
          sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
          onClick={() => {
            signIn("google", { callbackUrl: "/backoffice" });
          }}
        >
          Sing In With Google
        </Button>
      </Box>
    </BackOfficeLayout>
  );
};

export default SingIn;
