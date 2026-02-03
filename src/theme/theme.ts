"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Custom color palette - warm neutral tones
const palette = {
  primary: {
    main: "#C9B59C", // warm brown
    light: "#D9CFC7", // light warm gray
    dark: "#8B7355", // darker brown
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#D9CFC7", // warm gray
    light: "#EFE9E3", // light cream
    dark: "#C9B59C", // warm brown
    contrastText: "#1f2937",
  },
  background: {
    default: "#F9F8F6", // off-white
    paper: "#EFE9E3", // light cream
  },
  text: {
    primary: "#1f2937", // dark gray
    secondary: "#6b7280", // medium gray
  },
};

let theme = createTheme({
  palette,
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    h1: {
      fontWeight: 300,
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
    },
    h2: {
      fontWeight: 300,
      letterSpacing: "0.08em",
    },
    h3: {
      fontWeight: 300,
      letterSpacing: "0.05em",
    },
    body1: {
      fontWeight: 300,
      lineHeight: 1.75,
    },
    body2: {
      fontWeight: 300,
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 400,
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "12px 32px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          "&:hover": {
            backgroundColor: palette.primary.light,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 400,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#d1d5db",
            },
            "&:hover fieldset": {
              borderColor: "#9ca3af",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

export default theme;
