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
            <div style={{ width: "260px" }}>
              <AppNavBar />
            </div>

            <Container style={{ flex: 1, padding: 16 }}>
              <SearchBar />
              {children}
            </Container>
          </Box>
        </ProviderWrapper>
      </body>
    </html>
  );
}
