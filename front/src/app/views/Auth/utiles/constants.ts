import { FieldNameEnum } from "../../../global/enums";

export const defaultValueSignUp = {
    [FieldNameEnum.first_name]: '',
    [FieldNameEnum.last_name]: '',
    [FieldNameEnum.email]: '',
    [FieldNameEnum.password]: '',
    [FieldNameEnum.password_confirm]: '',
}

export const defaultValueLogIn = {
    [FieldNameEnum.email]: '',
    [FieldNameEnum.password]: '',
}