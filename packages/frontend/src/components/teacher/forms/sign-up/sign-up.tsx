const SignUp = () => (
  <form action="#">
    <div>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" required />
      </label>
    </div>
    <div>
      <label htmlFor="email">
        Email
        <input type="email" id="email" name="email" required />
      </label>
    </div>
    <div>
      <label htmlFor="password">
        New Password
        <input type="text" id="password" name="password" required />
      </label>
    </div>
    <div>
      <label htmlFor="confirmPassword">
        Confirm Password
        <input
          type="text"
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

export default SignUp;
