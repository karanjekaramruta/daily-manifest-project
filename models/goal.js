const mongoose = require("mongoose");

module.exports = mongoose.model("Goal", {
  title: {
    type:String,
    required:[true, 'goal name is mandatory']
  },
  type:{
    type:String,
    required:[true, 'goal type is mandatory']
  },
  category:{
    type:String,
    required:[true, 'goal category is mandatory']
  },
  startDate:{
    type:Date,
    required:[true, 'start date for goal is required']
  },
  endDate:{
    type:Date,
    required:[true, 'end date for goal is mandatory']
  },
  tasks:[{
    title:{
      type:String,
      required:[true, 'title of task is mandatory']
    }
  }],
  performedTasks:[{
    title:{
      type:String,
      required:[true, 'title of task is mandatory']
    },
    completionDate:{
      type:Date,
      required:[true, 'Task completion is mandatory to mark task as completed']
    }
  }]
}, "goals");
