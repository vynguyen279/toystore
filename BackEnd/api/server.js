const app = require('./components/app')

//init route
const routes = require('./routes/indexRoute')
routes(app)


app.listen(8080, () => console.log("App running 8080"))


