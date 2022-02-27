import { createStore } from "redux";
import { vacationsReducer } from "./VacationsState";
import { AuthReducer } from "./AuthState"


const vacationsStore = createStore(vacationsReducer);
export default vacationsStore;

export const authStore = createStore(AuthReducer);