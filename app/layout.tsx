// app/layout.tsx
import "./globals.css";

import { Box, Container } from "@mui/material";
import AppNavBar from "@/components/AppNavBar";
import ProviderWrapper from "@/components/ProviderWrapper";
import SearchBar from "@/components/SearchBar";

export const metadata = {
  title: "MiniTube",
  description: "YouTube Clone with Next.js + MUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          <Box sx={{ display: "flex" }}>
            <AppNavBar />

            <Container style={{ flex: 1, padding: 16 }}>
              <Box sx={{ ml: { xs: "80px", sm: "240px" }, p: 2 }}>
                <SearchBar />
                {children}
              </Box>
            </Container>
          </Box>
        </ProviderWrapper>
      </body>
    </html>
  );
}
