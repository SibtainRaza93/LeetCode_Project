import validator from "validator"

const validate = (data)=>{

    const mandatoryField = ['firstName', 'emailId', 'password'];

    const isAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

    if(!isAllowed){
        throw Error("Some field missing");
    }

    if(!validator.isEmail(data.isEmail)){
        throw Error("Invalid Email");
    }

    if(!validator.isStrongPassword(data.password)){
        throw Error("Week password");
        
    }
}

export default validate;