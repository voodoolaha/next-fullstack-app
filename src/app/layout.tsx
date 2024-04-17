'use client';

import './globals.css';

import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { darkTheme } from './theme/theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <StyledEngineProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <body>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </body>
        </ThemeProvider>
      </StyledEngineProvider>
    </html>
  );
}
