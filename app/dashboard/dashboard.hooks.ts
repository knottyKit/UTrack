import { useEffect, useState } from "react";
import { fetchTotalOwed, fetchTotalReceive, fetchNextTransaction } from "./dashbord.services";

interface upcomingInterface{
    amount: number,
    date: string
}
export const useDashboardData = (user?: string) => {
    const [totalOwed, setTotalOwed] = useState<number | null>(null);
    const [totalReceive, setTotalReceive] = useState<number | null>(null);
    const [nextTransact, setNext]  = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(!user) return;
        setLoading(true);
        Promise.all([
            fetchTotalOwed(user),
            fetchTotalReceive(user),
            fetchNextTransaction(user)
        ]).then(([owed,receive,next])=>{
            setTotalOwed(owed);
            setTotalReceive(receive);
            setNext(next);
        }).finally(()=>{
            setLoading(false);
        })
    }, [user])

    return {
        totalOwed,
        totalReceive,
        nextTransact,
        loading
    }
}