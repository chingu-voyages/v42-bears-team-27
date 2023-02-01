// Fetcher function to be used for useSWR hooks
export function fetcher(endpoint: string) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status === 401) {
      // TODO Call logoutHandler function
    }
    return res.json();
  });
}

export * from './classroom';
export * from './teacher';
export * from './student';
export * from './auth';
