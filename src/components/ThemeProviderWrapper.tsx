import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import { useAppSelector } from "../store/hook";

interface Props {
  children: ReactNode;
}

const ThemeProviderWrapper = ({ children }: Props) => {
  const { theme: appTheme } = useAppSelector((state) => state.app);
  const getDesignTokens = () => {
    if (appTheme === "light") {
      return {
        palette: {
          primary: {
            main: "#627254",
          },
          secondary: {
            main: "#FFE194",
          },
          info: {
            main: "#F5F7F8",
          },
          success: {
            main: "#1B9C85",
            dark: "",
          },
        },
      };
    }
    return {
      palette: {
        primary: {
          main: "#1d3557",
        },
        secondary: {
          main: "#a8dadc",
        },
        info: {
          main: "#F8F6F4",
        },
        success: {
          main: "#399918",
        },
      },
    };
  };

  const theme = createTheme(getDesignTokens());
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
