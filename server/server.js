import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', userRoute);
app.use('/api/message', messageRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(PORT, () => {
    console.log(`server on listening on http:/ /localhost:${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        console.log('[DATA . TO]', data);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.message);
        }
    });
})