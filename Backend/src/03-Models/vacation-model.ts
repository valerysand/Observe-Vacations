import Joi from "joi";
import { UploadedFile } from "express-fileupload"


class VacationModel {
    public vacationId: number;
    public vacationDestination: string;
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
        this.vacationDestination = vacation.vacationDestination;
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
        vacationDestination: Joi.string().required().min(5).max(50),
        vacationDescription: Joi.string().required().min(10).max(500),
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
        vacationDestination: Joi.string().required().min(5).max(50),
        vacationDescription: Joi.string().required().min(10).max(500),
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
        vacationDestination: Joi.string().optional().min(5).max(50),
        vacationDescription: Joi.string().optional().min(10).max(500),
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