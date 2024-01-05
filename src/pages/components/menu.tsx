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
            <button type="button" onClick={() => navigate("/")}><FaHouse />
                <span className="footer__grid-text">{t("MENU_HOME")}</span></button>
            <button type="button" onClick={() => navigate("/profile")}><CgProfile />
                <span className="footer__grid-text">{t("MENU_PROFILE")}</span></button>
            <button type="button" onClick={() => navigate("/search")}><AiOutlineSearch />
                <span className="footer__grid-text">{t("MENU_SEARCH")}</span> </button>
            <button type="button" onClick={() => navigate("/notifications")}><IoMdNotifications />
                <span className="footer__grid-text">{t("MENU_NOTI")}</span> </button>
            {user === null ?
                <button type="button" onClick={() => navigate("/users/login")}><IoMdLogIn />
                    <span className="footer__grid-text">{t("MENU_LOGIN")}</span> </button>
                :
                <button type="button" onClick={async () => {
                    const auth = getAuth(app);
                    await signOut(auth);
                    toast.success("로그아웃되었습니다.")
                }}><IoIosLogOut />
                    <span className="footer__grid-text">{t("MENU_LOGOUT")}</span> </button>
            }
        </div>
    </div>
}