const jwt = require("jsonwebtoken")
const { BadRequest, Unauthorized } = require("../errors/error")
const Room = require('../models/Room')

const createRoom = async (roomId, userId) => {
    const room = await Room.create({ id: roomId, users: userId })
    if (!room) {
        throw new BadRequest('Rooms not created')
    }
    return res.status(StatusCodes.OK).json({ room })
}
const joinRoom = async (roomId, userId) => {
    const room = await Room.create({ id: roomId, users: userId })
    if (!room) {
        throw new BadRequest('Rooms not created')
    }
    return res.status(StatusCodes.OK).json({ room })
}

module.exports = { createRoom, joinRoom }