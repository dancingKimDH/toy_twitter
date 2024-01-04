import { useNavigate } from "react-router-dom"
import { FaHouse } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut, IoMdLogIn, IoMdNotifications } from "react-icons/io";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import useTranslation from "hooks/useTranslation";

export default function MenuList() {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const t = useTranslation();

    return <div className="footer">
        <div className="footer__grid">
            <button type="button" onClick={() => navigate("/")}><FaHouse /> {t("MENU_HOME")}</button>
            <button type="button" onClick={() => navigate("/profile")}><CgProfile /> {t("MENU_PROFILE")}</button>
            <button type="button" onClick={() => navigate("/search")}><AiOutlineSearch /> {t("MENU_SEARCH")} </button>
            <button type="button" onClick={() => navigate("/notifications")}><IoMdNotifications/> {t("MENU_NOTI")} </button>
            {user === null ?
                <button type="button" onClick={() => navigate("/users/login")}><IoMdLogIn /> {t("MENU_LOGIN")} </button>
                :
                <button type="button" onClick={async () => {
                    const auth = getAuth(app);
                    await signOut(auth);
                    toast.success("로그아웃되었습니다.")
                }}><IoIosLogOut /> {t("MENU_LOGOUT")} </button>
            }
        </div>
    </div>
}