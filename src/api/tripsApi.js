import HTTP from '.'

export default {
    fetchTrips() {
        return HTTP.get('/trips');
    },
    fetchTripsByArticleId(articleId){
        return HTTP.get(`/trips/trip/${articleId}`);
    }
}