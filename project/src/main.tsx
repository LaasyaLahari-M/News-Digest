import { NhostClient, NhostProvider } from '@nhost/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from './ApolloProvider';
import App from './App.tsx';
import './index.css';

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN || '',
  region: import.meta.env.VITE_NHOST_REGION || '',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <ApolloProvider>
        <App />
      </ApolloProvider>
    </NhostProvider>
  </StrictMode>
);