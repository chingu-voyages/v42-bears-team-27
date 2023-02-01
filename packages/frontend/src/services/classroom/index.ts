import type { IClassroom, IEvent } from 'interfaces';

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
  )
    .then(() => 'Success: Created!')
    .catch((error) => {
      throw error;
    });

// PUT REQUESTS
export const putClassroom = (updatedClassroom: Partial<IClassroom>) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedClassroom),
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
  )
    .then(() => 'Success: Updated!')
    .catch((error) => {
      throw error;
    });

// DELETE REQUESTS
export const deleteClassroomEvent = (deletedEvent: Partial<IEvent>) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/events/${deletedEvent.id}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deletedEvent),
    },
  )
    .then(() => 'Success: Deleted!')
    .catch((error) => {
      throw error;
    });
