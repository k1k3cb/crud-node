const usersController = {};

const path = require('path');
const fsPromises = require('fs/promises');
const { v4 } = require('uuid');
const filePath = path.resolve(__dirname, '../../data/users.json');

usersController.getAllUsers = async (req, res) => {
  try {
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);
    res.send(users);
  } catch (error) {
    return res.send('error: ' + error);
  }
};

usersController.createUser = async (req, res) => {
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
};

usersController.updateUser = async (req, res) => {
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
};

usersController.deleteUser = async (req, res) => {
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

    res.send('User deleted successfully');
  } catch (error) {
    return res.send('error: ' + error);
  }
};

module.exports = usersController;
