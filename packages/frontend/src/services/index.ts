// Fetcher function to be used for useSWR hooks
export function fetcher(endpoint: string) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status === 401) {
        throw Error('Unauthenticated!');
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });
}

export * from './classroom';
export * from './teacher';
export * from './student';
export * from './auth';
