import React, {useContext} from "react"
import {UserContext} from "../../App";

export default ({children}) => {
    const {loggedIn} = useContext(UserContext)

    return loggedIn() ? children : ""
}