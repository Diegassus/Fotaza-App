const { request, response } = require("express");
const Comment = require("../models/comment");
const { User } = require("../models");


const getComments = async (req = request, res = response) => {
    const {id} = req.params;
    const comments = await Comment.findAll({ // description
        where:{
            ImageId:id
        }
    });

    let result = [];

    for(let i = 0; i<comments.length; i++){
        const comment = comments[i];
        const user = await User.findByPk(comment.UserId);

        const userComment = {
            username: user.username,
            description: comment.description
        }

        result.push(userComment);
    }

    //console.log(result)
    res.json(result);
    
}

module.exports = {
    getComments
}