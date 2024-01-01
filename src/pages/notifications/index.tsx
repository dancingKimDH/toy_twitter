import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "pages/components/context/AuthContext";
import { useContext, useEffect, useState } from "react"

interface NotificationProps {
    id: string;
    uid: string;
    url: string;
    isRead: string;
    content: string;
    createdAt: string;
}

export default function NotificationPage() {
    
    const {user} = useContext(AuthContext); 
    
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);

    useEffect(() => {
        if(user) {
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
    
    return <h1>NotificationPage</h1>
}