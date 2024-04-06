
const express=require("express");
const app=express();

const { connection } = require('./config/db');

app.use(express.json())


const authRoutes = require('./routes/auth.js');
const taskRoutes = require('./routes/task.js');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);



/* MONGOOSE SETUP */
const port = process.env.PORT || 8500;

app.listen(port, async () => {
  try {
    await connection;
   console.log(`Server is running on port ${port}`)
  } catch (err) {
    
    console.error(err);
    process.exit(1); // Exit the process with an error code
  }

 
})

module.exports = app;