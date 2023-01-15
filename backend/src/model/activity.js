const mongoose = require('mongoose');
const { Schema } = mongoose;
let enu = {
    values : ['Run', 'Bicycle', 'Ride', 'Swim', 'Walk', 'Hike'],
    message : `Please insert first letter upper case & singular like 'Run', 'Bicycle', 'Ride', 'Swim', 'Walk', 'Hike'.`
}
const userActivitySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : [true, 'Activity type not provided.'],
        enum : enu
    },
    duration : {
        type : Number,
        required : [true, 'Duration not provided.']
    },
    date :{
        type : String,
        required:true
    },
    status : {
        type : String,
        default : 'active'
    }
});

module.exports = mongoose.model('activity', userActivitySchema);