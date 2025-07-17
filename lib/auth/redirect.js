import { redirect } from "next/navigation";
import { getLoggedInUser } from "../actions/userActions";


export const redirectIfNotLoggedIn = async () => {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect('/sign-in');
    return loggedIn;
}