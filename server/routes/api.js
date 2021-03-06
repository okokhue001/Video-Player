const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db =
  "mongodb+srv://paul1:paul2050@paulcluster1-anf5l.mongodb.net/videoDatabase?retryWrites=true&w=majority";
 mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
    if (err) {
        console.log("Error! " + err);
    }
});



router.get('/videos', function (req, res) {
    console.log('Get resquest for all videos');
    Video.find({})
        .exec(function (err, videos) {
            if (err) {
                console.log("Error retrieving videos");
            } else {
                res.json(videos);
            }
        });
});

router.get('/videos/:id', function (req, res) {
    console.log('Get resquest for single video');
    Video.findById(req.params.id)
        .exec(function (err, video) {
            if (err) {
                console.log("Error retrieving video");
            } else {
                res.json(video);
            }
        });
});

router.post('/video', function (req, res) {
    console.log('post a video');
    let newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function (err, insertedVideo) {
        if (err) {
            console.log('Error saving video');
        } else {
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id', function (req, res) {
    console.log('Update a video');
    Video.findByIdAndUpdate(req.params.id, {
        $set: { title: req.body.title, url: req.body.url, description: req.body.description }
    },
        {
            new: true
        },
        function (err, updatedVideo) {
            if (err) {
                res.send("Error updating video");
            } else {
                res.json(updatedVideo);
            }
        }
    )
});

router.delete('/video/:id', function (req, res) {
    console.log("Deleting a video");
    Video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
        if(err){
            res.send("Error deleting video");
        }else{
            res.json(deletedVideo);
        }
    });
});

module.exports = router;