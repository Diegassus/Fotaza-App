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
    let derecho;

    for(let i = 0; i<comments.length; i++){
        const comment = comments[i];
        const user = await User.findByPk(comment.UserId);
        if(req.user.id == comment.UserId){
            derecho = true
        }else{
            derecho=false
        }
        const createdAt =`${comment.createdAt.getDay()}/${comment.createdAt.getMonth()}/${comment.createdAt.getFullYear()}`;
        const userComment = {
            id:comment.id,
            username: user.username,
            description: comment.description,
            derecho,
            createdAt
        }

        result.push(userComment);
    }

    //console.log(result)
    res.json(result);
    
}

const getComment = async (req,res=response)=>{
    const comment = await Comment.findByPk(req.params.id);
    let derecho = false
    if(req.user.id == comment.UserId){
        derecho = true
    }
    res.json({
        id : comment.id,
        description: comment.description,
        derecho,
        createdAt:`${comment.createdAt.getDay()}/${comment.createdAt.getMonth()}/${comment.createdAt.getFullYear()}`
    })
}

const deleteComment = async (req,res=response) => {
    const {id} = req.params;
    await Comment.destroy({
        where:{
            id:id
        }
    });
    res.json({
        msg:"Se elimino el comentario con exito"
    });
}

module.exports = {
    getComments,
    deleteComment,
    getComment
}