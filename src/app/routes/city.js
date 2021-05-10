module.exports = app => {
    const cityController = app.controllers.city;

    app.post('/cities', cityController.createCity);
    app.get('/cities', cityController.getCity);
    
}