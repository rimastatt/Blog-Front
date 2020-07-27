import HTTP from '.'

export default {
    createUser(user) {
        return HTTP.post('user/new', user)
    },

    getUser() {
        return HTTP.get('/user'); 
    }
}