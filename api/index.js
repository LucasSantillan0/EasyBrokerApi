const Express = require("express");
const bodyParser = require("body-parser")
const axios = require("axios")
const morgan = require('morgan');


const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.listen(3001, () => {
    console.log(`App listening at http://localhost:${3001}`)
  })
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  
app.get("/",(req,res)=>{
    const {page} = req.query
    axios.get(`https://api.stagingeb.com/v1/properties?page=${page||1}&limit=20`,
    {headers:{'X-Authorization': "l7u502p8v46ba3ppgvj5y2aad50lb9"}})
  .then(response=>
    response.data     
  )
  .then(data=> res.json(data))
  .catch(e=> res.status(404).send(e))
  
})