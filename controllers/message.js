const { BadRequest } = require('../errors/error')
const Message = require('../models/Message')
const Room = require('../models/Room')
const { StatusCodes } = require('http-status-codes')

const getAllMessages = async (req, res) => {
    const allMessages = await Message.find({ roomId: req.params.roomId })
    if (!allMessages) {
        throw new BadRequest('Messages not found')
    }
    res.status(StatusCodes.OK).json({ allMessages })
}

const createMessage = async (req, res) => {
    const { msg, roomId } = req.body
    if (roomId.length < 3) {
        throw new BadRequest('Rooms not created')
    }
    roomId = roomId.substring(0, 3)
    const room = await Room.find({ id: roomId })
    if (!room) {
        createRoom(roomId, req.user._id)
        const message = await Message.create({ message: msg, roomId: roomId, createdBy: req.user._id })
        if (!message) {
            throw new BadRequest('Messages not created')
        }
        return res.status(StatusCodes.OK).json({ Message })
    }
    const user = await Room.find({ id: roomId, users: req.users._id })
    if (!user) {
        joinRoom(roomId, req.user._id)
        const message = await Message.create({ message: msg, roomId: roomId, createdBy: req.user._id })
        if (!message) {
            throw new BadRequest('Messages not created')
        }
        return res.status(StatusCodes.OK).json({ message })
    }
    const message = await Message.create({ message: msg, roomId: roomId, createdBy: req.user._id })
    if (!message) {
        throw new BadRequest('Messages not created')
    }
    return res.status(StatusCodes.OK).json({ message })
}

const updateMessage = async (req, res) => {
    const { id, message } = req.body
    const msg = await Message.findOneAndUpdate({ _id: id, message: message })
    if (!msg) {
        throw new BadRequest('Messages not updated')
    }
    res.status(StatusCodes.OK).json({ msg })
}
const deleteMessage = async (req, res) => {
    const id = req.params
    const Message = await Message.findOneAndDelete({ _id: id })
    if (!Message) {
        throw new BadRequest('Messages not updated')
    }
    res.status(StatusCodes.OK).json({ msg: `Message Deleted` })
}

module.exports = {
    getAllMessages, createMessage, deleteMessage, updateMessage
}