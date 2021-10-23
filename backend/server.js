import express from 'express'
import routes from './src/routes/routes'

const app= express()

app.use(routes)

app.listen(3001, ()=>{
    console.log("server run at http://localhost:3000")
})
