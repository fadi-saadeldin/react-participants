const express =require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path = require('path');
const participant=require('./routes/api/participant');

const app =express();
//body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// DB config
db=require('./config/keys').mongodbURL;
mongoose.connect(db)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

//use Routes
app.use('/api/participant',participant);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  

const port =process.env.PORT || 5000;

app.listen(port,()=> console.log(`Sever running on port ${port}`));