const cookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  signed: true,
  sameSite: 'none',
  expires: new Date(Date.now() + 2592000000), // 30 days
};
// if you change this, edit 'logout' too

module.exports = { cookieOptions };
