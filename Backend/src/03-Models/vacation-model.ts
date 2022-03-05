import Joi from "joi";
import { UploadedFile } from "express-fileupload"


class VacationModel {
    public vacationId: number;
    public vacationName: string;
    public vacationDescription: string;
    public vacationImage: string;   //Backend return imageName to Frontend
    public fromDate: string;
    public toDate: string;
    public vacationPrice: number;
    public followers: number;
    public image: UploadedFile;
    public isFollowed: boolean;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.vacationName = vacation.vacationName;
        this.vacationDescription = vacation.vacationDescription;
        this.vacationImage = vacation.vacationImage;
        this.fromDate = vacation.fromDate;
        this.toDate = vacation.toDate;
        this.vacationPrice = vacation.vacationPrice;
        this.followers = vacation.followers;
        this.image = vacation.image;
    }
    // Joi validations:
    // Post Validation Schema
    private static postValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        vacationName: Joi.string().required().min(10).max(50),
        vacationDescription: Joi.string().required().min(20).max(500),
        vacationImage: Joi.forbidden(),
        fromDate: Joi.string().required().min(4).max(100),
        toDate: Joi.string().required().min(4).max(100),
        vacationPrice: Joi.number().required(),
        followers: Joi.forbidden(),
        image: Joi.object().required()
    });

    // Put Validation Schema
    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().required().positive().integer(),
        vacationName: Joi.string().required().min(10).max(50),
        vacationDescription: Joi.string().required().min(20).max(500),
        vacationImage: Joi.forbidden(),
        fromDate: Joi.string().required().min(4).max(100),
        toDate: Joi.string().required().min(4).max(100),
        vacationPrice: Joi.number().required(),
        followers: Joi.forbidden(),
        image: Joi.object().required()

    });

    // Patch Validation Schema
    private static patchValidationSchema = Joi.object({
        vacationId: Joi.required(),
        vacationName: Joi.string().optional().min(10).max(50),
        vacationDescription: Joi.string().optional().min(20).max(500),
        vacationImage: Joi.forbidden(),
        fromDate: Joi.string().optional(),
        toDate: Joi.string().optional(),
        vacationPrice: Joi.number().optional(),
        followers: Joi.forbidden(),
        image: Joi.object().optional()

    });

    // Validate POST:
    public validatePost() {
        const result = VacationModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    // Validate PUT:
    public validatePut() {
        const result = VacationModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    // Validate PATCH:
    public validatePatch() {
        const result = VacationModel.patchValidationSchema.validate(this);
        return result.error?.message;
    }
}


export default VacationModel;