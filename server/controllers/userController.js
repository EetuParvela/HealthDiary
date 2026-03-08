import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const getUsers = async (req, res) => {
  const users = await userModel.listAllUsers();
  res.json(users);
};

const postUser = async (req, res) => {
  const newUser = req.body;

  if (!(newUser.username && newUser.password && newUser.email)) {
    return res.status(400).json({error: 'Required fields missing'});
  }

  const hash = await bcrypt.hash(newUser.password, 10);

  newUser.password = hash;
  const newUserId = await userModel.createUser(newUser);
  res.status(201).json({message: 'User created', userId: newUserId});
};

const postLogin = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await userModel.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({message: 'Invalid username or password'});
    }

    delete user.password;

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({message: 'Login successful', user, token});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

export {getUsers, postUser, postLogin, getMe};
