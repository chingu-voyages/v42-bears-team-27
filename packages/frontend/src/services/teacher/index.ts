// POST REQUESTS
// TODO: Add interface for newMessage
export const postDirectMessageToStudent = (newMessage: any) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teacher/send-direct-message`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    },
  )
    .then(() => 'Success: Sent!')
    .catch((error) => {
      throw error;
    });

// TODO: Add interface for newMessage
export const postBroadcastMessageToStudents = (newMessage: any) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teacher/broadcast-message`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    },
  )
    .then(() => 'Success: Sent!')
    .catch((error) => {
      throw error;
    });
