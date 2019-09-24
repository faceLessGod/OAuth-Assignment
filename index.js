const express = require('express')
const app = express()
const axios = require('axios')

const clientID = '8e0ccad1a139fb2a0413'
const clientSecret = '7d21b22404f1083f2650bf526149007f62b52053'


app.get('/home', (req, res) => {

  const requestToken = req.query.code
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    
    headers: {
         accept: 'application/json'
    }
    
  }).then((response) => {
    
    const accessToken = response.data.access_token
    console.log(response.data)
    
    // redirect the user to the home page, along with the access token
    res.redirect(`/home.html?access_token=${accessToken}`)
  })
})

app.use(express.static(__dirname + '/public'))
app.listen(8080,()=>{
    console.log("Server listening on port : 8080")
})