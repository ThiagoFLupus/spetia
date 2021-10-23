import ToFullName from './../../src/models/ToFullNameModel'

let toFullName= new ToFullName()

let requestP= {
    params: {
        paramToFullName: ""
    }
}

let responseP={
    status: (p)=> {
        responseP.data.push(p)
        return responseP
    },
    send: (p)=> {
        responseP.data.push(p)
        return responseP
    },
    data: []
}

describe('Testes de validação do parâmetro de rota enviado ao servidor', ()=> {
    /*
    *     Seção de testes que devem gerar erro. Se os erros forem capturados os testes são aprovados
    */   

    test('O parâmetro enviado na rota não pode ser string vazia', ()=> {        
        const result= toFullName.transformToFullName(requestP, responseP)
        if(result.data[0] != 402) throw Error
    })

    //validar com envio de caracteres que não sejam números

    test('O parâmetro enviado na rota não pode ser nula', ()=> {  
        requestP.params.paramToFullName= null      
        const result= toFullName.transformToFullName(requestP, responseP)
        if(result.data[0] != 402) throw Error
    })

    test('Não pode haver caracteres especiais no parâmetro de rota, a não ser o sinal de "menos"', ()=> {
        requestP.params.paramToFullName= "19@5"      
        const result= toFullName.transformToFullName(requestP, responseP)
        console.log("verifying...", result)
        if(result.data[0] != 402) throw Error
    })

    test('O sinal de "menos" não pode estar em outra posição que não seja a primeira', ()=> {
        requestP.params.paramToFullName= "99-9"
        const result= toFullName.transformToFullName(requestP, responseP)
        if(result.data[0] != 402) throw Error
    })

    test('Não pode haver letras no parâmetro de rota', ()=> {
        requestP.params.paramToFullName= "93t9"
        const result= toFullName.transformToFullName(requestP, responseP)
        if(result.data[0] != 402) throw Error
    })

    test('O valor enviado no parâmetro de rota deve estar no intervalo requerido, positivo: [-99999, 99999]', ()=> {
        requestP.params.paramToFullName= 999999
        const result= toFullName.transformToFullName(requestP, responseP)
        if(result.data[0] != 402) throw Error
    })

    test('O valor enviado no parâmetro de rota deve estar no intervalo requerido, negativo: [-99999, 99999]', ()=> {
        requestP.params.paramToFullName= -999999
        const result= toFullName.transformToFullName(requestP, responseP)
        if(result.data[0] != 402) throw Error
    })

    /*
    *     Seção de testes que devem obter sucesso
    */
})