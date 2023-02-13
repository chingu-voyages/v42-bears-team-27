import useSWR from 'swr';

import { fetcher } from 'src/services';

const REFRESH_INTERVAL_MS = 1800000;

function useUser(role: string | null) {
  const { data, error, isLoading } = useSWR(
    role ? `/api/v0/${role}` : null,
    fetcher,
    {
      refreshInterval: REFRESH_INTERVAL_MS,
    },
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default useUser;
