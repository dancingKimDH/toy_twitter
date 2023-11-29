import { useNavigate } from "react-router-dom"
import { FaHouse } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut, IoMdLogIn } from "react-icons/io";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

export default function MenuList() {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);


    return <div className="footer">
        <div className="footer__grid">
            <button type="button" onClick={() => navigate("/")}><FaHouse /> Home</button>
            <button type="button" onClick={() => navigate("/profile")}><CgProfile /> Profile</button>

            {user === null ?
                <button type="button" onClick={() => navigate("/users/login")}><IoMdLogIn /> LogIn</button>
                :
                <button type="button" onClick={() => navigate("/")}><IoIosLogOut /> LogOut</button>
            }
        </div>
    </div>
}