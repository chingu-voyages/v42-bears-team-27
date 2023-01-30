import type { IClassroom, IEvent } from 'interfaces';

// GET REQUESTS
export const getClassroom = () =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Not authenticated');
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });

// POST REQUESTS
export const postClassroomEvent = (newEvent: Omit<IEvent, 'id'>) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/events/create`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    },
  );

// PUT REQUESTS
export const putClassroom = (updatedClassroom: Partial<IClassroom>) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/${updatedClassroom.id}`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedClassroom),
    },
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('Not authenticated');
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });

export const putClassroomEvent = (updatedEvent: Partial<IEvent>) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/events/${updatedEvent.id}`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    },
  );
