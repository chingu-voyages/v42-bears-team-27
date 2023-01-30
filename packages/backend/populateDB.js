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

const Subject = require('./models/subjectModel');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const subjects = [];

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

function createSubjects(cb) {
  async.series(
    [
      (callback) => {
        subjectCreate(
          'english',
          [
            {
              slug: 'punctuation',
              title: 'Punctuation',
              types: ['lesson'],
            },
          ],
          callback,
        );
      },
      (callback) => {
        subjectCreate(
          'mathematics',
          [
            {
              slug: 'indices',
              title: 'Indices',
              types: ['exercise'],
            },
          ],
          callback,
        );
      },
      (callback) => {
        subjectCreate(
          'history',
          [
            {
              slug: 'cold-war',
              title: 'Cold War',
              types: ['test'],
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
  [createSubjects],
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
