export const REGEX_RULES = {
    EMAIL:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

export const VALIDATION_CONSTANTS = {
    COMMON: 'This field is required',
    NAME_REQUIRED: 'Please provide your name',
    EMAIL_REQUIRED: 'Please provide your email',
    EMAIL_VALID: 'Please enter a valid email address',
    EMAIL_ALREADY_EXISTS: 'Email is already exist',
    PASSWORD_REQUIRED: 'Please provide your password',
    PASSWORD_MIN_6: 'Use at least 6 characters',
    PASSWORD_UPPER_AND_LOWERCASE: 'Use upper and lower case letters',
    PASSWORD_1_DIGIT: 'Use 1 or more digits',
    PASSWORD_SPECIAL_CHARACTER: 'Use 1 or more special characters',
    PASSWORD_CONFIRM_MATCH: 'Passwords should match!',
    PASSWORD_INCORRECT: 'Incorrect password. Please check and try again.',
}