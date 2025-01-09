import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: 14,
      },
    },
  },
  colors: {
    primary: {
      "50": "#dbeafe",
      "100": "#c7d2fe",
      "200": "#a5b4fc",
      "300": "#818cf8",
      "400": "#6366f1",
      "500": "#4f46e5",
      "600": "#4338ca",
      "700": "#3730a3",
      "800": "#312e81",
      "900": "#1e1b4b",
    },
    primaryOld: {
      "50": "#E5F2FF",
      "100": "#B8DBFF",
      "200": "#8AC4FF",
      "300": "#5CADFF",
      "400": "#2E96FF",
      "500": "#007FFF",
      "600": "#0066CC",
      "700": "#004C99",
      "800": "#003366",
      "900": "#001933",
    },
  },
})

export default theme
