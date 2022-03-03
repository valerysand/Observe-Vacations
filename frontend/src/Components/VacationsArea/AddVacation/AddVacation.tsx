import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    const navigate = useNavigate();


    useEffect(() => {
        if (!authService.isLoggedIn()) {
            notifyService.error("You are not logged in");
            navigate("/login");
        }
    }, []);

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    async function submit(vacation: VacationModel) {
        try {
            const addedVacation = await vacationsService.addVacation(vacation);
            notifyService.success(`Vacation ${addedVacation.vacationName} was added`);
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="AddVacation">

            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>Name: </label>

                {/* Native Validation:  */}
                {/* <input type="text" {...register("name")} required minLength={3} maxLength={100} /> */}

                {/* useForm Validation: */}
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
                <input type="number"  {...register("vacationPrice", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 1000, message: "Price can't exceed $1000" },
                
                    
                })} step="0.01" />
                <span>{formState.errors.vacationPrice?.message}</span>

                <label>From date: </label>
                <input type="date" {...register("fromDate", {
                    required: { value: true, message: "Missing date" },
                    
                })} />
                <span>{formState.errors.fromDate?.message}</span>

                <label>To date: </label>
                <input type="date" {...register("toDate", {
                    required: { value: true, message: "Missing date" },

                
                })} />
                <span>{formState.errors.toDate?.message}</span>

                <label>Image:</label>
                <input type="file" accept="image/*" {...register("image", {
                    required: { value: true, message: "Missing image" }
                })} />
                <span>{formState.errors.image?.message}</span>

                <button>Add</button>

                <button ><NavLink to="/home">Back</NavLink></button>

            </form>


        </div >
    );
}

export default AddVacation;
