import MessageModel from "../model/MessageModel.js";

export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const result = await MessageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });
        if (result) {
            const response = {
                message: result.message.text,
                fromSelf: result.sender.toString() === from,
                id: result._id
            }
            return res.json({ message: 'Message added successfully.', response });
        } else {
            return res.json({ message: 'Failed to add message to the database' });
        }
    } catch (ex) {
        next(ex);
    }
}

export const getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await MessageModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 });

        // if (!messages?.length) {
        //     return res.json({ status: false, message: 'No messages' });
        // }

        const projectMessage = messages.map(message => ({
            message: message.message.text,
            fromSelf: message.sender.toString() === from,
            id: message._id
        }));

        return res.json({ status: true, message: 'Get message successfully', projectMessage });

    } catch (ex) {
        next(ex);
    }
}