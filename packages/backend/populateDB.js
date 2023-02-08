#! /usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

console.log(
  'This script populates some test subjects to your database. Specified database as argument - e.g.: populateDB mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true',
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

function subjectCreate(title, topics, cb) {
  const subjectDetail = { title, topics };
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

function lessonCreate(topic, subject, cb) {
  const lessonDetail = { topic, subject };
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
        subjectCreate('English', [], callback);
      },
      (callback) => {
        subjectCreate('Mathematics', [], callback);
      },
    ],
    // optional callback
    cb,
  );
}

function createLessons(cb) {
  async.series(
    [
      (callback) => {
        lessonCreate('Punctuation', subjects[0], callback);
      },
    ],
    // optional callback
    cb,
  );
}

function createExercises(cb) {
  async.series(
    [
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
          'punctuation',
          'Punctuation',
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
  [createSubjects, createLessons, createExercises, updateSubjectsTopics],
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
