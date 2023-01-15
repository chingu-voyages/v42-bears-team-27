import { useState } from 'react';

const NewStudent: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // mockData classroom
    const classroom = '63c339704aa8be1b4851e7b5';
    const data = { fullName, email, classroom };

    try {
      const call = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/student/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const response = await call.json();
      if (call.ok) {
        setFullName('');
        setEmail('');
        setAlert('Created!');
      } else {
        setAlert(response.message);
      }
    } catch (error) {
      setAlert('error');
    }
  };
  return (
    <>
      <h1>Invite a Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">
            Student’s Full Name:
            <input
              id="fullName"
              type="text"
              placeholder="FirstName, LastName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Student’s E-mail:
            <input
              id="email"
              type="email"
              placeholder="yourEmail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Send Invite</button>
        </div>
        <h3>{alert}</h3>
      </form>
    </>
  );
};

export default NewStudent;
