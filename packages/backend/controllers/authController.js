const { getSocketConnection } = require('../socket');

const loginTeacher = async (req, res) => {
  const io = getSocketConnection();
  const { user } = res.locals;
  req.login(user, { session: false }, (error) => {
    if (error) {
      res.json({ Error: error });
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };

    io.on('teacher-signed-in', (socket) => {
      console.log(
        `teacher with id ${user._id} connected on socket with id ${socket.id}`,
      );
      socket.on('teacher-signed-out', () => {
        console.log(
          `teacher with id ${user._id} disconnected on socket with id ${socket.id}`,
        );
      });
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
  const io = getSocketConnection();
  const { user } = res.locals;
  req.login(user, { session: false }, (error) => {
    if (error) {
      res.json({ Error: error });
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };

    io.on('teacher-signed-in', (socket) => {
      console.log(
        `student with id ${user._id} connected on socket with id ${socket.id}`,
      );
      socket.on('teacher-signed-out', () => {
        console.log(
          `student with id ${user._id} disconnected on socket with id ${socket.id}`,
        );
      });
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
