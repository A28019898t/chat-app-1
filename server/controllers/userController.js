import User from '../model/UserModel.js';
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
    try {
        console.log('[Data Register]', req.body);
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.json({ status: false, message: 'Username, email, password are required' })
        }

        // check username is unique
        const usernameCheck = await User.findOne({ username });

        if (usernameCheck) {
            return res.json({ status: false, message: 'Username is existed' });
        }
        // check email is unique
        const emailCheck = await User.findOne({ email });

        if (emailCheck) {
            return res.json({ status: false, message: 'Email is existed' });
        }

        const bcryptPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: bcryptPassword
        });

        delete user.password;
        if (user) {
            return res.json({ status: true, user });
        } else {
            return res.json({ status: false, message: 'Failed in add new user!' });
        }
    } catch (ex) {
        next(ex);
    }
}

export const login = async (req, res, next) => {
    try {
        console.log('[Data Login]', req.body);

        const { username, password } = req.body;

        //check the value from client

        if (!username || !password) {
            return res.json({ status: false, message: 'Username and password filed is essential!' })
        }

        // find the username in database;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ status: false, message: 'User is incorrect!' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const newUser = { ...user['_doc'], password: '' }
            return res.json({ message: 'Successful', user: newUser });
        }

    } catch (ex) {
        next(ex);
    }
}

export const setAvatar = async (req, res, next) => {
    try {
        const { avatarImage } = req.body;
        const { userId } = req.params;

        const user = await User.findByIdAndUpdate({ _id: userId }, {
            avatarImage,
            isAvatarImageSet: true
        });

        if (user) {
            console.log({ user });
            return res.json({ status: true, message: 'Set picture profile successfully', user });
        } else {
            return res.json({ status: true, message: 'No user' });
        }
    } catch (ex) {
        next(ex);
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const users = await User.find().select([
            'email',
            'username',
            'avatarImage',
            '_id'
        ]);

        if (users) {
            const allUser = users.filter(user => user.id !== userId);
            return res.json({ status: true, message: 'all user', allUser })
        } else {
            return res.json({ status: false, message: 'get all user failure' })
        }
    } catch (ex) {
        next(ex);
    }
}