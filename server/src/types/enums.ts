export enum ErrorEnum {
    USER_NOT_FOUND = 'User is not found',
    USER_WITH_EMAIL_NOT_FOUND = 'User with so email is not found',
    PASSWORD_IS_NOT_COMPARE = 'Password is not compare',
    PASSWORD_IS_INCORRECT = 'Password is incorrect',
    EMAIL_IS_INCORRECT = 'Email is incorrect',
    PASSWORD_OR_EMAIL_ARE_INCORRECT = 'Email or password are incorrect',
    PROFILE_NOT_FOUND = 'Profile not found',
    USER_WITH_SUCH_EMAIL_EXISTS = 'The user with such email exists',
    USER_NOT_AUTH = 'User is not authorized',
    NOT_FOUND = 'Not found',
    LOGIN = 'Incorrect email or password',
    FORBIDDEN = 'Forbidden',
    FILE_NOT_UPLOADED = 'File not uploaded',
    REMAINING_LIKE_NOT_FOUNT = 'The remaining like is missing',
    INCORRECT_USER_ID = 'Incorrect user ID. You can not use own user ID',
    INTERNAL_SERVER_ERROR = 'Internal server error',
}