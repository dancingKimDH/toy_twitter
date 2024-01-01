import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "pages/components/context/AuthContext";
import NotificationBox from "pages/components/notifications/NotificationBox";
import { useContext, useEffect, useState } from "react"

export interface NotificationProps {
    id: string;
    uid: string;
    url: string;
    isRead: boolean;
    content: string;
    createdAt: string;
}

export default function NotificationPage() {

    const { user } = useContext(AuthContext);

    const [notifications, setNotifications] = useState<NotificationProps[]>([]);

    useEffect(() => {
        if (user) {
            let ref = collection(db, "notifications");
            let notificationQuery = query(ref, where("uid", "==", user?.uid), orderBy("createdAt", "desc"))

            onSnapshot(notificationQuery, (snapShot) => {
                let dataObj = snapShot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setNotifications(dataObj as NotificationProps[]);
            })
        }
    })

    return (
        <div className="home">
            <div className="home__top">
                <div className="home__title">
                    <div className="home__title-text">Notifications</div>
                </div>
                <div className="post">
                    {notifications?.length > 0 ? notifications?.map((notice) =>
                        <div key={notice.id}> <NotificationBox notification={notice} key={notice.id}/> </div>
                    ) : (
                        <div className="post__no-posts">
                            <div> 알림이 없습니다 </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}