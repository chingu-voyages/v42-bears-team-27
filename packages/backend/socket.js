const { Server } = require('socket.io');

const Student = require('./models/studentModel');
const Teacher = require('./models/teacherModel');

let io;

async function addSocketIDsToDB(userData, socket) {
  if (userData.role === 'teacher') {
    await Teacher.findOneAndUpdate(
      { _id: userData._id },
      { socketID: socket.id },
    );
  }

  if (userData.role === 'student') {
    await Student.findOneAndUpdate(
      { _id: userData._id },
      { socketID: socket.id },
    );
  }
}

async function removeSocketIDsFromDB(userData) {
  if (userData.role === 'teacher') {
    await Teacher.findOneAndUpdate({ _id: userData._id }, { socketID: '' });
  }

  if (userData.role === 'student') {
    await Student.findOneAndUpdate({ _id: userData._id }, { socketID: '' });
  }
}

module.exports = {
  initializeSocketConnection: (httpServer, corsOptions) => {
    io = new Server(httpServer, {
      cors: corsOptions(),
    });

    io.on('connection', (socket) => {
      console.log(`user connected on socket with id ${socket.id}`);

      socket.on('user-logged-in', async (userData) => {
        socket.emit('ack-user-logged-in');
        addSocketIDsToDB(userData, socket);
      });

      socket.on('user-logged-out', async (userData) => {
        socket.emit('ack-user-logged-out');
        removeSocketIDsFromDB(userData);
      });

      socket.on(
        'new-message-sent',
        async (isBroadcast, teacherID, studentID = '') => {
          console.log(
            'new-message-sent event recieved from socketID ',
            socket.id,
          );

          // helper function
          const sendNotificationToStudent = async (id) => {
            const student = await Student.findById(id);

            if (!student) {
              console.log(
                `message recipient student with id ${id} not found in DB`,
              );
              return;
            }

            const { socketID } = student;

            if (socketID) {
              socket.to(socketID).emit('revalidate-notifications-endpoint');
            }
          };

          if (!isBroadcast) {
            sendNotificationToStudent(studentID);
            return;
          }

          const teacher = await Teacher.findById(teacherID);

          if (!teacher) {
            console.log(
              `message sender teacher with id ${teacherID} not found in DB`,
            );
            return;
          }

          const { classroom } = teacher;
          const { students } = classroom;

          students.forEach((student) => sendNotificationToStudent(student._id));
        },
      );

      socket.on('disconnect', () => {
        console.log(`user disconnected on socket with id ${socket.id}`);
      });
    });

    return io;
  },
  getSocketConnection: () => {
    if (!io) {
      throw new Error('socket is not initialized');
    }
    return io;
  },
};
