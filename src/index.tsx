import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react'

import App from 'app';
import theme from 'styles/theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
    <BrowserRouter>
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </HelmetProvider>
    </BrowserRouter>
);
