import type { Fetcher } from 'swr';
import type { IClassroom, IEvent } from 'interfaces';

// GET REQUESTS
export const getClassroom = () =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

export const getClassroomEvents: Fetcher<IEvent[]> = (endpoint: string) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

// PUT REQUESTS
export const putClassroom = (newEvents: Partial<IClassroom>) => {
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvents),
  }).then((res) => res.json());
};
