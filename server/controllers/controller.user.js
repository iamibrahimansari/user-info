const User = require('../models/model.user');
const mongoose = require('mongoose');
const validator = require('validator');


const createUser = async (req, res) =>{
    const {name, email, address} = req.body;
    if(!(name && email && address)){
        return res.status(400).json({error: 'Fill all the fields'});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({error: 'Email is invalid'});
    }
    try{
        let newUser = await User({name, email, address});
        newUser = await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        res.status(201).json({error: 'Something went wrong or may be your email is duplicate'});
    }
}

const getUsers = async (req, res) =>{
    const users = await User.find({});
    if(!users.length){
        res.status(404).json({error: 'There is no user in database'});
    }
    res.status(200).json(users);
}

const getUser = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User is not present'});
    }
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({error: 'User is not present'});
    }
    res.status(200).json(user);
}

const updateUser = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User is not present'});
    }
    const updatedUser = await User.findByIdAndUpdate(id, {...req.body}, {new: true});
    if(!updatedUser){
        return res.status(404).json({error: 'User is not present'});
    }
    res.status(200).json(updatedUser);
}

const deleteUser = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User is not present'});
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser){
        return res.status(404).json({error: 'User is not present'});
    }
    res.status(200).json(deleteUser);
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}