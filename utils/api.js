import axios from "axios"

export default {
    postGuest: (guest) => {
        return axios.post('/api/guestbook', guest);
    },

    getGuestList: () => {
        return axios.get('/api/guestbook');
    }
}