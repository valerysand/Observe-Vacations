import { OkPacket } from 'mysql';
import jwt from "../01-Utils/jwt";
import ClientError from '../03-Models/client-error';
import CredentialsModel from '../03-Models/credentials-model';
import Role from '../03-Models/role';
import UserModel from "../03-Models/user-model";
import dal from '../04-DAL/dal';


// Get all users from database
async function getAllUsers(): Promise<UserModel[]> {
    const sql = `SELECT * FROM users`;
    const users = await dal.execute(sql);
    return users;
}

async function register(user: UserModel): Promise<string> {
    // Validate register....
    const errors = user.validateRegister();
    if (errors) throw new ClientError(404, errors);

    // Check user in db
    const dbUsers = getAllUsers();
    const userInDb = (await dbUsers).find(u => u.username === user.username);
    if (userInDb) throw new ClientError(401, "User already exist");
    // Add to database
    const sql = `INSERT INTO users VALUES(DEFAULT, '${user.firstName}', '${user.lastName}', '${user.username}', '${user.password}' , ${user.role = Role.User})`;
    const info: OkPacket = await dal.execute(sql);
    user.id = info.insertId;
    // user.role = Role.User;
    delete user.password;
    const token = jwt.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    // Validate login..
    const errors = credentials.validateLogin();
    if (errors) throw new ClientError(404, errors);
    // Get user from db
    const sql = `SELECT * from users WHERE username = '${credentials.username}' and password = '${credentials.password}'`;
    const users = await dal.execute(sql);
    const user = users[0];

    if (!user) throw new ClientError(401, "Incorrect username or password");

    delete user.password;

    const token = jwt.getNewToken(user);

    return token;
}
export default {
    register,
    login,
    getAllUsers
}