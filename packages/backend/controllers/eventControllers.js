const Event = require('../models/eventModels');


const addEvent = async (req, res) => {

    const newEvent = new Event({
      name: req.body.name,
      created_date: req.body.created_date,
      due_date:req.body.due_date,
      task: req.body.task,
    });
    await newEvent.save();
    return res.json(newEvent);
  };

  module.exports = addEvent