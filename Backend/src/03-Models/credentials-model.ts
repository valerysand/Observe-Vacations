import Joi from "joi";


class CredentialsModel {
    public username: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    private static loginValidationSchema = Joi.object({
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(5).max(20)
    });

    public validateLogin() {
        const result = CredentialsModel.loginValidationSchema.validate(this);
        return result.error?.message;
    }
}

export default CredentialsModel;