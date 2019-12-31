import { extend, configure} from 'vee-validate';
import { required, email} from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

// configure({
//    classes: {
//        invalid: 'cl-form-item-error',
//    }
// });

const validator = (validatorName, validatorFn) => {
    if(validatorName && validatorFn && typeof validatorFn === 'function'){
        extend(validatorName, {
            validate(value){
                return validatorFn(value);
            },
            message: (fieldName, placeholders) => {
                return validatorFn(placeholders._value_);
            }
        });
    }
};

const validateMessages = {
    EN: {
        required: messages['required'] || '必填项',
        email: messages['required'] || '邮箱验证失败',
    },
    zh_CN: {
        required: messages['required'] || '必填项',
        email: messages['required'] || '邮箱验证失败',
    },
};

extend('required', {
    ...required,
    params: ['message'],
    message: (fieldName, placeholders) => {
        return `The ${fieldName} field must be`
        // return placeholders.message || validateMessages.zh_CN.required
    }
});

extend('email', {
    ...email,
    params: ['message'],
    message: (fieldName, placeholders) => {
        return placeholders.message || validateMessages.email
    }
});

extend('string', {
    validate(value, args){
        let isMin = !isNaN(args.min);
        let isMax = !isNaN(args.max);
        if(isMin && isMax){
            return value.length >= args.min && value.length <= args.max
        }else if(isMin){
            return value.length >= args.min
        }else if(isMax){
            return value.length <= args.max
        }else{
            return true;
        }
    },
    params: ['min', 'max', 'message'],
    message: (fieldName, placeholders) => {
        let isMin = !isNaN(placeholders.min);
        let isMax = !isNaN(placeholders.max);
        let message = '';

        if(isMin && isMax){
            message = `must be between ${placeholders.min} and ${placeholders.max} characters`
        }else if(isMin){
            message = `must be at least ${placeholders.min} characters`
        }else if(isMax){
            message = `cannot be longer than ${placeholders.max} characters`
        }
        return placeholders.message || message;
    }
});


extend('number', {
    validate(value, args){
        let isMin = !isNaN(args.min);
        let isMax = !isNaN(args.max);
        if(isMin && isMax){
            return value >= args.min && value <= args.max
        }else if(isMin){
            return value >= args.min
        }else if(isMax){
            return value <= args.max
        }else{
            return true;
        }
    },
    params: ['min', 'max', 'message'],
    message: (fieldName, placeholders) => {
        let isMin = !isNaN(placeholders.min);
        let isMax = !isNaN(placeholders.max);
        let message = '';

        if(isMin && isMax){
            message = `must be between ${placeholders.min} and ${placeholders.max} number`
        }else if(isMin){
            message = `must be less than ${placeholders.min} number`
        }else if(isMax){
            message = `cannot be greater than ${placeholders.max} number`
        }
        return placeholders.message || message;
    }
});


extend('array', {
    validate(value, args){
        let isMin = !isNaN(args.min);
        let isMax = !isNaN(args.max);
        if(isMin && isMax){
            return value.length >= args.min && value.length <= args.max
        }else if(isMin){
            return value.length >= args.min
        }else if(isMax){
            return value.length <= args.max
        }else{
            return true;
        }
    },
    params: ['min', 'max', 'message'],
    message: (fieldName, placeholders) => {
        let isMin = !isNaN(placeholders.min);
        let isMax = !isNaN(placeholders.max);
        let message = '';

        if(isMin && isMax){
            message = `length must be between ${placeholders.min} and ${placeholders.max} array`
        }else if(isMin){
            message = `length must be less than ${placeholders.min} array`
        }else if(isMax){
            message = `length cannot be greater than ${placeholders.max} array`
        }
        return placeholders.message || message;
    }
});

export {
    validator
}

