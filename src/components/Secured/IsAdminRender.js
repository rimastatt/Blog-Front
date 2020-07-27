import React, { useContext } from "react";
import { UserContext } from "../../App";

export default ({ children, role, ...props }) => {

    const { user, loggedIn } = useContext(UserContext)

    return (
        <>
            {
                user?.roles.includes("ADMIN") && loggedIn() ? children : <></>
            }
        </>
    )
}