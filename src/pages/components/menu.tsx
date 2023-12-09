import { useNavigate } from "react-router-dom"
import { FaHouse } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut, IoMdLogIn } from "react-icons/io";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";

export default function MenuList() {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    return <div className="footer">
        <div className="footer__grid">
            <button type="button" onClick={() => navigate("/")}><FaHouse /> Home</button>
            <button type="button" onClick={() => navigate("/profile")}><CgProfile /> Profile</button>
            <button type="button" onClick={() => navigate("/search")}><AiOutlineSearch /> Search</button>
            {user === null ?
                <button type="button" onClick={() => navigate("/users/login")}><IoMdLogIn /> LogIn</button>
                :
                <button type="button" onClick={async () => {
                    const auth = getAuth(app);
                    await signOut(auth);
                    toast.success("로그아웃되었습니다.")
                }}><IoIosLogOut /> LogOut</button>
            }
        </div>
    </div>
}