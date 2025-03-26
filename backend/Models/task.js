const mongoose =require('mongoose')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  complition: { type: Boolean, enum: ['completed', 'incomplete'], default: 'incomplete' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
 
});

const Task = mongoose.model('Task', taskSchema);

module.exports=Task;