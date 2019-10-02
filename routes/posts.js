const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

// retrieve all posts 
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts)
    } catch (err) {
        res.json({ message: err });
    }
})

// get specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json({ post })
    } catch (err) {
        res.json({ message: err })
    }

})

// sends a post
router.post('/', async (req, res) => {
    try {
        const savedPost = await Post.create(req.body);
        res.json(savedPost);
    } catch (err) {
        res.json(err)
    }
})

// update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
})

//delete a post 
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.findByIdAndRemove({ _id: req.params.postId })
        res.json(removedPost)
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;    