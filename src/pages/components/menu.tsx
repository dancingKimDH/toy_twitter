import { useNavigate } from "react-router-dom"
import { FaHouse } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

export default function MenuList() {

    const navigate = useNavigate();

    return <div className="footer">
        <div className="footer__grid">
            <button type="button" onClick={() => navigate("/")}><FaHouse /> Home</button>
            <button type="button" onClick={() => navigate("/profile")}><CgProfile /> Profile</button>
            <button type="button" onClick={() => navigate("/")}><IoIosLogOut /> LogOut</button>
        </div>
    </div>
}