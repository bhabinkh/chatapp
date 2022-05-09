const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'room id is required field.']
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: ' User'
    }]
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Room', RoomSchema)