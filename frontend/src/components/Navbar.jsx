import {
FaBell,
FaMoon,
FaUserCircle
} from "react-icons/fa";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import "./Navbar.css";


export default function Navbar(){

    const { user } = useContext(AuthContext);


    return(

        <header className="navbar">

            <div>

                <h1>
                    Dashboard ✨
                </h1>


                <p>
                    Welcome back, {user || "User"} 💜
                </p>


            </div>


            <div className="navbar-icons">

                <FaMoon/>

                <FaBell/>

                <FaUserCircle className="profile"/>

            </div>


        </header>

    )

}