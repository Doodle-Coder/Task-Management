import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    title: {
       type: String,
       required: true 
      },
    description: {
       type: String 
      },
    status: {
      type: String,
      enum: ['incomplete', 'in-progress', 'completed'],
      default: 'incomplete' },
  });



  const Task = mongoose.model('Task', TaskSchema);
  export default Task;