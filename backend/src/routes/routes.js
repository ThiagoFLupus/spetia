import express from 'express'
import {toTransformFullName}  from './../controllers/toFullNameController'

const routes= express.Router()

//route to transform numeric format param to fullname extension
routes.get('/to-fullname/:paramToFullName', (request, response)=> {
    return toTransformFullName(request, response)
})

module.exports= routes