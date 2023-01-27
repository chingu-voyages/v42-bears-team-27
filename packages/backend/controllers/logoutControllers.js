const logout = async (req, res) => {
  res
    .clearCookie('auth', {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      signed: true,
    })
    .end();
};

module.exports = {
  logout,
};
