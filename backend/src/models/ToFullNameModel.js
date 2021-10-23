class ToFullName{
    convertedToFullName= null

    constructor(){}

    getConvertedToFullName(){
        return this.convertedToFullName
    }

    setConvertedToFullName(toConvert){
        this.convertedToFullName= toConvert
    }

    transformToFullName (request, response) {
        try{
            const paramToFullName= request.params.paramToFullName
            const resultValidation= this.validateParamsToFullName(paramToFullName)

            if(resultValidation.length > 0){
                return response.status(402).send({
                    message: "Erro nos parâmetros de consulta enviados",
                    data: resultValidation
                })
            }

            //it start process of conversion
            let extensionValue= ""
            let paramWithRemoved= paramToFullName
            if(paramWithRemoved.includes("-")) {
                extensionValue= extensionValue + "menos "
                paramWithRemoved= paramWithRemoved.replace("-", "")
            }

            //it store last and penultimate verified position of param as position of ten has specific names
            let lastValue= null
            let beforeLastValue= null

            //it store names in full of each digit
            let extensionAlgarisms= []

            //it controls position of algarism: unity, ten, hundred...
            let j= 4;
            for(let i= paramWithRemoved.length; i > 0; i--){
                if(paramWithRemoved.charAt(i-1) != '0'){
                    extensionAlgarisms.push(this.getFromDictionary(paramWithRemoved.charAt(i-1), j))
                }

                //the position of ten has specific names. Here, it approaches each of
                if((j == 0 || j == 3) && paramWithRemoved.charAt(i-1) == '1'){
                    if(lastValue != null){
                        extensionAlgarisms.pop()
                        if(lastValue != '0'){
                            extensionAlgarisms.pop()
                        }
                        extensionAlgarisms.push(this.getFromDictionary(paramWithRemoved.charAt(i-1), j)[lastValue])
                    }
                }

                //the position of hundred has spcific name, when it equals 1
                if(j == 2 && paramWithRemoved.charAt(i-1) == '1'){
                    if(lastValue != null){
                        extensionAlgarisms.pop()

                        if(lastValue == '0' && beforeLastValue == '0') extensionAlgarisms.push(this.getFromDictionary(paramWithRemoved.charAt(i-1), j)[0])
                        else extensionAlgarisms.push(this.getFromDictionary(paramWithRemoved.charAt(i-1), j)[1])
                    }
                }

                lastValue= paramWithRemoved.charAt(i-1)
                if(j < 4)beforeLastValue= paramWithRemoved.charAt(i)
                j--;
            }

            extensionAlgarisms= extensionAlgarisms.reverse()

            //get array with names of digits and concatenate them
            extensionAlgarisms.forEach((elem, i)=> {
                if(i == 0) extensionValue= extensionValue + elem
                else extensionValue= extensionValue + " e " + elem
            })
            
            this.setConvertedToFullName(extensionValue)
        }catch(error){
            return response.status(500).send({
                message: "Um erro inesperado ocorreu no servidor",
                data: error
            })
        }

        return response.status(200).send({
            message: "success",
            extension: this.getConvertedToFullName()
        })
    }

    validateParamsToFullName(param){
        //errors of validation are insert in array errosValidations like strings
        let errorsValidations= []

        //does parameter exist?
        if(param == null || typeof param === "undefined" || param == ""){
            errorsValidations.push("Parâmetro não reconhecido ou inexistente")
        }else{
            //único caracter especial é o menos?
    
            //Is symbol "minus" in initial position?
            for(let i= 1; i < param.length; i++){
                if(param.charAt(i) == '-') {
                    errorsValidations.push("O símbolo 'menos' só pode ficar no início do valor do parâmetro")
                    return errorsValidations
                }
            }

            //is parameter value in permited interval and is it valid numeric?
            let numericParam= null
            try{
                numericParam= parseInt(param)
                if(numericParam.toString().length < param.length){
                    errorsValidations.push("Parâmetro inválido. O parâmetro enviado dever ser numérico")
                }
            }catch(error){
                errorsValidations.push("Parâmetro inválido. O parâmetro enviado dever ser numérico")
                return errorsValidations
            }
            if(numericParam < -99999 || numericParam > 99999){
                errorsValidations.push("Valor de parâmetro fora do intervalo permitido")
            }                                                       
        }   
        
        return errorsValidations
    }

    //return names of digits in each position of got route parameter, to convert by extension
    getFromDictionary(valueP, position){
        let value= parseInt(valueP)
        const dictionary= {
            1: {
                4: "um",
                3: ["dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
                2: ["cem", "cento"],
                1: "um mil",
                0: ["dez mil", "onze mil", "doze mil", "treze mil", "catorze mil", "quinze mil", "dezesseis mil", "dezessete mil", "dezoito mil", "dezenove mil"]
            },
            2: {
                4: "dois",
                3: "vinte",
                2: "duzentos",
                1: "dois mil",
                0: "vinte"

            },
            3:{
                4: "três",
                3: "trinta",
                2: "trezentos",
                1: "três mil",
                0: "trinta"
            },
            4:{
                4: "quatro",
                3: "quarenta",
                2: "quatrocentos",
                1: "quatro mil",
                0: "quarenta "
            },
            5:{
                4: "cinco",
                3: "cinquenta",
                2: "quinhentos",
                1: "cinco mil",
                0: "cinquenta"
            },
            6:{
                4: "seis",
                3: "sessenta",
                2: "seiscentos",
                1: "seis mil",
                0: "sessenta"
            },
            7:{
                4: "sete",
                3: "setenta",
                2: "setecentos",
                1: "sete mil",
                0: "setenta"
            },
            8:{
                4: "oito",
                3: "oitenta",
                2: "oitocentos",
                1: "oito mil",
                0: "oitenta"
            },
            9:{
                4: "nove",
                3: "noventa",
                2: "novecentos",
                1: "nove mil",
                0: "noventa"
            },
        }

        return dictionary[value][position]
    }
}

module.exports= ToFullName