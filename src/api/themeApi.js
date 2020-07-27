import HTTP from '.'

export default {
    fetchThemes() {
        return HTTP.get('http://localhost:8081/themes')
    }
}