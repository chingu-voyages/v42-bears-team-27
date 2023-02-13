import useSWRImmutable from 'swr/immutable';

import { fetcher } from 'src/services';

function useUser(role: string | null) {
  // NOTE: useSWR would need to be used once
  // users are able to modify their data i.e. email, password,
  const { data, error, isLoading } = useSWRImmutable(
    role ? `/api/v0/${role}` : null,
    fetcher,
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default useUser;
