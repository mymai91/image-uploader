1. src/lib/theme/theme.ts

```
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
```

2. src/provider/ThemeProvider.tsx

```
import theme from "@/lib/theme/theme"
import { ChakraProvider } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default ThemeProvider
```

3. Add to layout src/pages/\_app.tsx

```
import AppProvider from "@/provider/AppProvider"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
```
