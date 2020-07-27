import HTTP from '.'

export default {
    createBooking(booking) {
        let data = new FormData();
        data.append("email", booking.email)
        data.append("location", booking.location)
        data.append("travelClass", booking.travelClass)
        data.append("checkInDate", booking.checkInDate)
        data.append("checkOutDate", booking.checkOutDate)
        data.append("adults", booking.adults)
        data.append("children", booking.children)
        data.append("totalPrice", booking.totalPrice)
        return HTTP.post('/booking', data)
    },

    getBookingsByUserId() {
        return HTTP.get('/booking/info')
    }
}