const express = require('express');
const usersRoutes = require('./routes/users.routes');
const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api/users', usersRoutes);

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
