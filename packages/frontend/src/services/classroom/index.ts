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

// POST REQUESTS
export const postClassroomEvent = (newEvent: IEvent) => {
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  }).then((res) => res.json());
};

// PUT REQUESTS
export const putClassroom = (
  updatedClassroom: Omit<IClassroom, 'events' | 'subjects'>,
) => {
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedClassroom),
  }).then((res) => res.json());
};

export const putClassroomEvent = (updatedEvent: IEvent) => {
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEvent),
  }).then((res) => res.json());
};
