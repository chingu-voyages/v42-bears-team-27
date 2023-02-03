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

    req.app.locals.io.on('connection', (socket) => {
      console.log(`new teacher with socket id ${socket.id} connected`);
      socket.emit('teacher-connected');
    });

    return res
      .cookie('auth', JSON.stringify(payload), {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 2592000000), // 30 days
      })
      .json({
        _id: user._id,
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

    req.app.locals.io.on('connection', (socket) => {
      console.log(`new student with socket id ${socket.id} connected`);
      socket.emit('student-connected');
    });

    res
      .cookie('auth', JSON.stringify(payload), {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 2592000000), // 30 days
      })
      .status(200)
      .json({
        _id: user._id,
        fullName: user.fullName,
      });
  });
};

const logout = async (_, res) => {
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
