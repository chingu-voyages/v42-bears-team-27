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

export const postMarkMessageAsRead = (messageID: string) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/student/mark-message-as-read`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageID }),
    },
  )
    .then(() => 'Success: Message was marked as read!')
    .catch((error) => {
      throw error;
    });

// PUT REQUESTS

// task = {
//  task: ID,
//  addTime?: Number, -> time (in ms) to add to existing spent time
//  completed?: Boolean
// }
export const putStudentTask = (task: any) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/student/task`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(() => 'Success: Updated!')
    .catch((error) => {
      throw error;
    });
