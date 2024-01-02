import User from '../models/user.js';
import express from 'express';
import List from '../models/list.js';
import list from '../models/list.js';

const listRouter = express.Router();

//CREATE
listRouter.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save().then(() => {
                res.status(200).json({ list })
            });
            existingUser.list.push(list);
            existingUser.save();
        }
    } catch (error) {
        console.log(error);
    }
});

//UPDATE
listRouter.put('/updateTask/:id', async (req, res) => {
    try {
        const { title, body } = req.body;

        const list = await List.findByIdAndUpdate(req.params.id, { title, body });
        list.save().then(() => {
            res.status(200).json({
                Message: "Task Updated",
            })
        });
    }
    catch (error) {
        console.log(error);
    }
});


// DELETE
listRouter.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { id } = req.body;
        
        // Pull the task from the user's list
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
        
        // If the task was successfully pulled from the user's list, then delete the task itself
        if (existingUser) {
            const list = await List.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json({
                    Message: "Task Deleted",
                })
            });
        }
    } catch (error) {
        console.log(error);
    }
});


//GET TASK 
listRouter.get('/getTask/:id', async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        if (list.length !== 0) {
            console.log(list)
            res.status(200).json({ list: list });
        } else {
            res.status(200).json({ message: "No Task " });
        }
    } catch (err) {
        console.log(err);
    }
})

export default listRouter;