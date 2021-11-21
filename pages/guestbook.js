import { useEffect, useState } from "react";
import Link from 'next/link'
import api from "../utils/api";

export default () => {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        let unmounted = false;
        api.getGuestList()
            .then(res => {
                if (!unmounted) {
                    setGuests(res.data);
                }
            }).catch(err => {
                console.log(err);
            });
        return () => {
            unmounted = true;
        }
    }, [guests]);

    return (
        <div className='container'>
            <span className='back-link'>
                <Link href='/'>
                    <a>← Back to homepage</a>
                </Link>
            </span>
            <h1>Guestbook</h1>
            <div className='guest-container'>
            {
                guests ?
                guests.map((guest, i) => (
                    <div key={i} className='guest-card'>
                        <h4 className='guest-msg'>"{guest.message}"</h4>
                        <p className='guest'>- {guest.name}</p>
                    </div>
                ))
                :
                <h3>No guests listed yet</h3>
            }
            </div>
        </div>
    )
}