#! /usr/bin/env node
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
        lessonCreate('Booleans', subjects[0], callback);
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
          subjects[0],
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
