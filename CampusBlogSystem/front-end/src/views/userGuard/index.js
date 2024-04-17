import {getUser} from "@/util";
import {Redirect, useHistory} from "react-router-dom";

export default function UserGuard(){
    const user = getUser()
    if (!user) return <Redirect to="/login"/>
    return <Redirect to="/home"/>
}
