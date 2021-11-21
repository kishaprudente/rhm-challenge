import axios from "axios"

export default {
    postGuest: async (guest) => {
        return await axios.post('/api/guestbook', guest);
    },

    getGuestList: () => {
        return axios.get('/api/guestbook');
    }
}