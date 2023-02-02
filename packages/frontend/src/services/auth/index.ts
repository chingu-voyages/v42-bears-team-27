import type { INewTeacherCredentials, IUserCredentials } from 'src/interfaces';

// POST REQUESTS
export const postCreateNewTeacher = (
  newTeacherCredentials: INewTeacherCredentials,
) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teacher/create`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTeacherCredentials),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error('Failed to signup!');
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });

export const postLoginExistingUser = (
  existingUserCredentials: IUserCredentials,
  userRole: string,
) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/auth/${userRole}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(existingUserCredentials),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error('Failed to login!');
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });

export const postLogoutExistingUser = () =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) {
        throw Error('Server error!');
      }

      return res.json();
    })
    .catch((error) => {
      throw error;
    });
