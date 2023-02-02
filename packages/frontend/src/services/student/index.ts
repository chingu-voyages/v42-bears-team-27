/* eslint-disable import/prefer-default-export */

// POST REQUESTS
// TODO: Add interface for newStudent
export const postCreateNewStudent = (newStudent: any) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/student/create`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newStudent),
  })
    .then(() => 'Success: Created!')
    .catch((error) => {
      throw error;
    });
