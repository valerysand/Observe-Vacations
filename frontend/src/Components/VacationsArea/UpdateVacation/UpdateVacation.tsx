import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationService";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {

    const id = +useParams().id;

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    async function submit(vacation: VacationModel) {
        try {
            vacation.vacationId = id;
            await vacationsService.updateVacation(vacation);
            alert("Vacation updated by Admin");
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="UpdateVacation">
            <h2>Update Vacation</h2>

            <form onSubmit={handleSubmit(submit)}>
                <label>Name: </label>
                <input type="text" {...register("vacationName", {
                    required: { value: true, message: "Missing name" },
                    minLength: { value: 3, message: "Name must be minimum 3 chars" },
                    maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                })} />
                <span>{formState.errors.vacationName?.message}</span>
                <label>Description: </label>
                <input type="text" {...register("vacationDescription", {
                    required: { value: true, message: "Missing name" },
                    minLength: { value: 3, message: "Name must be minimum 3 chars" },
                    maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                })} />
                <span>{formState.errors.vacationDescription?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("vacationPrice", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 1000, message: "Price can't exceed $1000" }
                })} step="0.01" />
                <span>{formState.errors.vacationPrice?.message}</span>

                <label>From date: </label>
                <input type="datetime-local" {...register("fromDate", {
                    required: { value: true, message: "Missing date" },

                })} />
                <span>{formState.errors.fromDate?.message}</span>

                <label>To date: </label>
                <input type="datetime-local" {...register("toDate", {
                    required: { value: true, message: "Missing date" },

                })} />
                <span>{formState.errors.toDate?.message}</span>

                <label>Image:</label>
                <input type="file" accept="image/*" {...register("image", {
                    required: { value: true, message: "Missing image" }
                })} />
                <span>{formState.errors.image?.message}</span>

                <button>Update</button>

                <button><NavLink to="/vacations">Back</NavLink></button>

            </form>
        </div>
    );
}

export default UpdateVacation;
