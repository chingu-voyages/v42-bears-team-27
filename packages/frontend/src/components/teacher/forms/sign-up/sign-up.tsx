import { FormEvent, useState } from 'react';

const FORM_SUBMIT_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teachers/create`;

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { name, email, password, confirmPassword };

    try {
      const call = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await call.json();

      console.log(response);
    } catch (err) {
      console.log(err); // TODO: more robust logging
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          New Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </label>
      </div>
      <div>
        <button type="submit">Join</button>
      </div>
    </form>
  );
};
export default SignUp;
