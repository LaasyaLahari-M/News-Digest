import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from "@apollo/client";
import { useNhostClient } from '@nhost/react';

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const nhost = useNhostClient();

  const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "https://backend-kxisgawledfxprjwdiiy.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${nhost.auth.getAccessToken()}`,
    },
  });

  return <Provider client={client}>{children}</Provider>;
};