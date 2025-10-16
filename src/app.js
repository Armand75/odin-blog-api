const express = require('express');
const cors = require('cors');
const passport = require('./config/passport.js');


const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Sample route
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);

const port = process.env.PORT || 3000;


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});