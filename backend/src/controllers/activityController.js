const activityModel = require('../model/activity');
exports.getActivity = (req, res) => {
    activityModel.find({}, (err, result) =>{
        if(result){
            res.status(200).json({
                activities : result
            })
        }else{
            res.status(500).json({
                error : err.message
            })
        }
    });
}

exports.postActivity = (req, res) => {
    const userActivity = getUserInput(req);
    userActivity.save((err, user) => {
        if(!(err)){
            res.status(200).json({
                insertedUser : user
            });
        }else{
            res.json({
                message : err.message
            })
        }
    })
}

exports.updateActivity = async (req, res) => {
    const id = req.params.id;
    activityModel.findByIdAndUpdate(id, { $set : req.body }, { runValidators: true }, (err, result) => {
        if(result){
            // //
            res.status(200).json({
                message : 'Record updated!'
            })
        }else{
            res.json({
                error : err.message
            })
        }
    })
}

exports.removeActivity = (req, res) => {
    const id = req.params.id;
    activityModel.deleteOne({id : id}, (err, result) =>{
        if(result){
            console.log(result);
            res.status(200).json({
                message : 'Record deleted.'
            })
        }else{
            res.json({
                error : err.message
            })
        }
    })
} 

function getUserInput(userReq) {
    const  {name, description, type, duration, date} = userReq.body;
    const activity = new activityModel({
        name : name,
        description : description,
        type : type,
        duration : duration,
        date : date
    });
    return activity;
}