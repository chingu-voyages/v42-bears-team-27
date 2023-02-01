const loginTeacher = async (req, res) => {
  const { user } = res.locals;
  req.login(user, { session: false }, (error) => {
    if (error) {
      res.json({ Error: error });
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };
    return res
      .cookie('auth', JSON.stringify(payload), {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 2592000000), // 30 days
      })
      .json({
        id: user._id,
        // email: user.email,
        title: user.title,
        fullName: user.fullName,
      });
  });
};

const loginStudent = async (req, res) => {
  const { user } = res.locals;
  req.login(user, { session: false }, (error) => {
    if (error) {
      res.json({ Error: error });
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };
    res
      .cookie('auth', JSON.stringify(payload), {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 2592000000), // 30 days
      })
      .status(200)
      .json({
        id: user._id,
        // email: user.email,
        fullName: user.fullName,
      });
  });
};

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
  loginTeacher,
  loginStudent,
  logout,
};
