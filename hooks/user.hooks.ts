import { useEffect, useState } from "react";
import { getUserData } from "@/services/user.service";

export const useUserData = (uid?: string) => {
    const [userData, setData] = useState<any>(null);
    useEffect(()=>{
        if(!uid) return;
        getUserData(uid).then(setData).catch(()=> setData(null))
    }, [uid])

    return { userData }
}