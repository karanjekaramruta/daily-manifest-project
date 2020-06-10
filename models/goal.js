const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const goalSchema = new Schema({
  personalgoal:{Array : [String ]},
  professiongoal:{Array : [String ]},
  task : {Array : [String ]},
  performedTask: {Array:[String]},
  goal:{type : Schema.Types.ObjectId, ref: 'Goal'},
  reading : {Array : [String ]},
  
  startDate:{type: Date},
  endDate:{type: Date }




});

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;