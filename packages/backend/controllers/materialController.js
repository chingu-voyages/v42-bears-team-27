const Lesson = require('../models/lessonModel');
const Exercise = require('../models/exerciseModel');

const getAllLessons = async (_, res) => {
  try {
    const lessons = await Lesson.find();
    if (!lessons) {
      return res.status(400).json({
        message: 'no lessons found',
      });
    }
    return res.json(lessons);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getLesson = async (req, res) => {
  const { id: lessonId } = req.params;
  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(400).json({
        message: 'lesson not found',
      });
    }
    return res.json(lesson);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getAllExercises = async (_, res) => {
  try {
    const exercises = await Exercise.find();
    if (!exercises) {
      return res.status(400).json({
        message: 'no exercises found',
      });
    }
    return res.json(exercises);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getExercises = async (req, res) => {
  const { id: exerciseId } = req.params;
  try {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(400).json({
        message: 'exercise not found',
      });
    }
    // Pick exercise question set at random
    const pickExerciseQuestionSet =
      exercise.content.pages[
        Math.floor(Math.random() * exercise.content.pages.length)
      ];
    // Transform exercise so it returns only ONE question set
    // instead of EVERY question set from it (i.e. exercise.content.pages)
    const transformedExercise = {
      ...exercise,
      content: {
        ...exercise.content,
        page: pickExerciseQuestionSet,
      },
    };
    return res.json(transformedExercise);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllLessons,
  getLesson,
  getAllExercises,
  getExercises,
};
