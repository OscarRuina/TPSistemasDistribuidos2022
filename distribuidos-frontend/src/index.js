import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './constants/theme';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);
