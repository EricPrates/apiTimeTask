import jsonwebtoken from 'jsonwebtoken';
import { User } from '../Models/User';
import { json } from 'sequelize';

export const makeToken = (user: User)  => {
    return jsonwebtoken.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email
        },
        process.env.PRIVATE_KEY as string,
        {
            expiresIn: '1h'
        }
    );
    
}
