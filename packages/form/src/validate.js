import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

const validator = (validatorName, validatorFn) => {
    if (validatorName && validatorFn && typeof validatorFn === 'function') {
        extend(validatorName, {
            validate(value) {
                return validatorFn(value);
            },
            message: (fieldName, placeholders) => {
                return validatorFn(placeholders._value_);
            }
        });
    }
};

const validateMessages = {
    required: messages['required'],
    email: messages['email'],
    // eslint-disable-next-line no-template-curly-in-string
    between: 'The {_field_} must be between {min} and ${max} {type}',
    min: 'The {_field_} must be min {min} {type}',
    max: 'The {_field_} must be max {max} {type}'
};

extend('required', {
    ...required,
    params: ['message'],
    message: (fieldName, placeholders) => {
        // return `The ${fieldName} field must be`
        return placeholders.message || validateMessages.required.replace('{_field_}', fieldName);
    }
});

extend('email', {
    ...email,
    params: ['message'],
    message: (fieldName, placeholders) => {
        return placeholders.message || validateMessages.email.replace('{_field_}', fieldName);
    }
});

extend('string', {
    validate(value, args) {
        const isMin = !isNaN(args.min);
        const isMax = !isNaN(args.max);
        if (isMin && isMax) {
            return value.length >= args.min && value.length <= args.max
        } else if (isMin) {
            return value.length >= args.min
        } else if (isMax) {
            return value.length <= args.max
        } else {
            return true;
        }
    },
    params: ['min', 'max', 'message'],
    message: (fieldName, placeholders) => {
        const isMin = !isNaN(placeholders.min);
        const isMax = !isNaN(placeholders.max);
        let message = placeholders.message;
        let type = '';

        if (!placeholders.message) {
            if (isMin && isMax) {
                type = 'between';
            } else if (isMin) {
                type = 'min';
            } else if (isMax) {
                type = 'max';
            }
            message = validateMessages[type].replace('{_field_}', fieldName).replace('{min}', placeholders.min).replace('{max}', placeholders.max).replace('{type}', 'characters')
        }

        return message;
    }
});

extend('number', {
    validate(value, args) {
        const isMin = !isNaN(args.min);
        const isMax = !isNaN(args.max);
        if (isMin && isMax) {
            return value >= args.min && value <= args.max
        } else if (isMin) {
            return value >= args.min
        } else if (isMax) {
            return value <= args.max
        } else {
            return true;
        }
    },
    params: ['min', 'max', 'message'],
    message: (fieldName, placeholders) => {
        const isMin = !isNaN(placeholders.min);
        const isMax = !isNaN(placeholders.max);
        let message = placeholders.message;
        let type = '';

        if (!placeholders.message) {
            if (isMin && isMax) {
                type = 'between';
            } else if (isMin) {
                type = 'min';
            } else if (isMax) {
                type = 'max';
            }
            message = validateMessages[type].replace('{_field_}', fieldName).replace('{min}', placeholders.min).replace('{max}', placeholders.max).replace('{type}', 'characters')
        }
        return message;
    }
});

extend('array', {
    validate(value, args) {
        const isMin = !isNaN(args.min);
        const isMax = !isNaN(args.max);
        if (isMin && isMax) {
            return value.length >= args.min && value.length <= args.max
        } else if (isMin) {
            return value.length >= args.min
        } else if (isMax) {
            return value.length <= args.max
        } else {
            return true;
        }
    },
    params: ['min', 'max', 'message'],
    message: (fieldName, placeholders) => {
        const isMin = !isNaN(placeholders.min);
        const isMax = !isNaN(placeholders.max);
        let message = placeholders.message;
        let type = '';

        if (!placeholders.message) {
            if (isMin && isMax) {
                type = 'between';
            } else if (isMin) {
                type = 'min';
            } else if (isMax) {
                type = 'max';
            }
            message = validateMessages[type].replace('{_field_}', fieldName).replace('{min}', placeholders.min).replace('{max}', placeholders.max).replace('{type}', 'characters')
        }
        return message;
    }
});

export {
    validator
}
