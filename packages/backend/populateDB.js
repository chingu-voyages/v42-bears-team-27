#! /usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

console.log(
  'This script populates some test subjects to your database. Specified database as argument - e.g.: populateDB mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/remote_class?retryWrites=true',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const mongoose = require('mongoose');

const Lesson = require('./models/lessonModel');
const Exercise = require('./models/exerciseModel');
const Subject = require('./models/subjectModel');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB); // TODO add DB from .env file & add commando to package.json
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const subjects = [];
const lessons = [];
const exercises = [];

function subjectCreate(slug, title, imageUrl, topics, cb) {
  const subjectDetail = { slug, title, imageUrl, topics };
  console.log(subjectDetail);

  const subject = new Subject(subjectDetail);

  subject.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Subject: ', subject);
    subjects.push(subject);
    cb(null, subject);
  });
}

function lessonCreate(topic, subject, content, cb) {
  const lessonDetail = { topic, subject, content };
  console.log(lessonDetail);

  const lesson = new Lesson(lessonDetail);

  lesson.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Lesson: ', lesson);
    lessons.push(lesson);
    cb(null, lesson);
  });
}

function exerciseCreate(topic, subject, cb) {
  const exerciseDetail = { topic, subject };
  console.log(exerciseDetail);

  const exercise = new Exercise(exerciseDetail);

  exercise.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Exercise: ', exercise);
    exercises.push(exercise);
    cb(null, exercise);
  });
}

async function subjectTopicsUpdate(id, slug, title, types, cb) {
  const subjectTopicsDetail = { slug, title, types };
  console.log(subjectTopicsDetail);

  const subject = await Subject.findByIdAndUpdate(
    id,
    {
      topics: subjectTopicsDetail,
    },
    { new: true },
  );

  if (!subject) {
    cb(subject, null);
    return;
  }

  console.log('Updated Subject: ', subject);
  cb(null, subject);
}

function createSubjects(cb) {
  async.series(
    [
      (callback) => {
        subjectCreate(
          'computer-science',
          'Computer Science',
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          [],
          callback,
        );
      },
      (callback) => {
        subjectCreate(
          'maths',
          'Maths',
          'https://images.unsplash.com/photo-1635372722656-389f87a941b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
          [],
          callback,
        );
      },
    ],
    // optional callback
    cb,
  );
}

function createMaterials(cb) {
  async.series(
    [
      (callback) => {
        lessonCreate(
          'Booleans',
          subjects[0],
          {
            pages: [
              {
                headline: 'What are booleans?',
                text: `Boolean is a formal notation for describing **logical relations**.\n![Three electric switches](https://freesvg.org/img/lumbricus-Light-switch-3-switches-two-off.png)\nFor example, in your household you have a switch in every room that switches lights either **on** or **off**.\n\n Likewise, boolean can represent these states as well using **true** or **false**.\n\n Many programming languages such as Python, C++, and JavaScript adopt this concept of booleans in the form of data types so that variables can store this useful state`,
              },
              {
                headline: 'Logic Gates - OR Gate',
                text: `There are many types of logic gates which can be used to create complex diagrams to illustrate **flowcharts**, for instance, a fire alarm system of a building.\n![Logic function OR](https://freesvg.org/img/Anonymous_logic_functions_-_digital_electronics_3.png)\nMore specifically will be looking at the **OR** gate first which is takes two inputs, and if either input is true, then it will pass through its "gate".`,
              },
              {
                headline: 'Logic Gates - AND Gate',
                text: `The next diagram you see is an **AND** gate.\n![Logic function AND](https://freesvg.org/img/Anonymous_logic_functions_-_digital_electronics_8.png)\nThis gate, unlike the **OR** gate, doesn't allow either input if they're true to pass, but instead that both inputs have to be true in order to pass through the gate.`,
              },
            ],
          },
          callback,
        );
      },
      (callback) => {
        exerciseCreate('Indices', subjects[1], callback);
      },
    ],
    // optional callback
    cb,
  );
}

function updateSubjectsTopics(cb) {
  async.series(
    [
      (callback) => {
        subjectTopicsUpdate(
          subjects[0],
          'booleans',
          'Booleans',
          [
            {
              material: lessons[0],
              materialModel: 'Lesson',
            },
          ],
          callback,
        );
      },
      (callback) => {
        subjectTopicsUpdate(
          subjects[1],
          'indices',
          'Indices',
          [
            {
              material: exercises[0],
              materialModel: 'Exercise',
            },
          ],
          callback,
        );
      },
    ],
    // optional callback
    cb,
  );
}

async.series(
  [createSubjects, createMaterials, updateSubjectsTopics],
  // Optional callback
  (err, results) => {
    if (err) console.log(`FINAL ERR: ${err}`);
    else {
      console.log(`Results: ${results}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  },
);
