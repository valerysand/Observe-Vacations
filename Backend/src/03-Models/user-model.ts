import Role from "./role";
import Joi from "joi";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: Role;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    private static registerValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        username: Joi.string().required().min(5).max(20),
        password: Joi.string().required().min(5).max(100),
        role: Joi.number().optional().integer().positive()
    });

    public validateRegister() {
        const result = UserModel.registerValidationSchema.validate(this);
        return result.error?.message;
    }
}

export default UserModel;