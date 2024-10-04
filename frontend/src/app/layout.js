import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter, Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import ResponsiveDrawer from "@/components/mui/ResponsiveDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Biblioteca UNMSM",
  description: "Aplicación web para la biblioteca UNMSM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${inter.variable} bg-background`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <ResponsiveDrawer>{children}</ResponsiveDrawer>
            </ThemeProvider>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
