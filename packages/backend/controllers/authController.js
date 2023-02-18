const { cookieOptions } = require('../utils');

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

    return res.cookie('auth', JSON.stringify(payload), cookieOptions).json({
      _id: user._id,
      title: user.title,
      forename: user.forename,
      surname: user.surname,
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
      .cookie('auth', JSON.stringify(payload), cookieOptions)
      .status(200)
      .json({
        _id: user._id,
        forename: user.forename,
        surname: user.surname,
      });
  });
};

const logout = async (_, res) => {
  res
    .clearCookie('auth', {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      signed: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .end();
};

module.exports = {
  loginTeacher,
  loginStudent,
  logout,
};
