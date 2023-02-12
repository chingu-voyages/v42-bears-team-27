import type { IClassroom, IEvent, IEventTask } from 'src/interfaces';

// POST REQUESTS
export const postClassroomEvent = (newEvent: Omit<IEvent, '_id' | 'tasks'>) =>
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
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });

export const postClassroomTask = (newTask: Omit<IEventTask, '_id'>) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/tasks/create`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  })
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }

      return res.json();
    })
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
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/events/${updatedEvent._id}`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
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

// DELETE REQUESTS
export const deleteClassroomEvent = (eventId: string) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/events/${eventId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });

export const deleteClassroomTask = (taskId: string) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/tasks/${taskId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });
