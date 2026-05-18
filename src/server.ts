import express from "express"
const app = express()
const port = 5000

app.get('/user', (req, res) => {
  res.send('Nodejs is running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
