const express = require('express');

const path = require('path');
const fsPromises = require('fs/promises');
const { v4 } = require('uuid');
const app = express();
app.use(express.json());

const filePath = path.resolve(__dirname, 'data/users.json');
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);
    res.send(users);
  } catch (error) {
    return res.send('error: ' + error);
  }
});


app.post('/', async (req, res) => {
  const newUser = { id: v4(), name: req.body.name, email: req.body.email };
  try {
    //* leer archivo
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);
    //* escribir archivo
    const updatedUsers = [...users, newUser];
    await fsPromises.writeFile(filePath, JSON.stringify(updatedUsers));
    //* envío archivo
    res.send(updatedUsers);
  } catch (error) {
    return res.send('error: ' + error);
  }
});

app.patch('/:id', async (req, res) => {
  const { id } = req.params;
  //   console.log('id: ' + id);
  try {
    //* leer archivo
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);

    //* buscar usuario
    const userIndex = users.findIndex((user) => user.userId === id);
    // console.log('userIndex', userIndex);

    //* modificar usuario
    users[userIndex].name = 'Nombre modificado con Patch';

    //* escribir archivo
    await fsPromises.writeFile(filePath, JSON.stringify(users));

    //* envío archivo
    res.send(users[userIndex]);
  } catch (error) {
    return res.send('error: ' + error);
  }
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    //* leer archivo
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);

    //* buscar usuario
    const userIndex = users.findIndex((user) => user.userId === id);

    //* Eliminar  usuario
    users.splice(userIndex, 1);

    //* escribir archivo
    await fsPromises.writeFile(filePath, JSON.stringify(users));

    //* envío archivo
    res.send(users[userIndex]);

    res.send('delete');
  } catch (error) {
    return res.send('error: ' + error);
  }
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
