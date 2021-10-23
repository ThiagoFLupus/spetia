import ToFullName from './../models/ToFullNameModel'

let manipuler= new ToFullName()

const toTransformFullName= (request, response)=> {
    return manipuler.transformToFullName(request, response)
}

export {toTransformFullName}