import * as yup from "yup";
import { REGEX_RULES, VALIDATION_CONSTANTS } from "../../../utiles/constants/validate-form";
import { FieldNameEnum } from "../../../global/enums";

export const schemaLogin = yup.object().shape({
    [FieldNameEnum.email]: yup
        .string()
        .required(VALIDATION_CONSTANTS.EMAIL_REQUIRED)
        .matches(REGEX_RULES.EMAIL, VALIDATION_CONSTANTS.EMAIL_VALID),
    [FieldNameEnum.password]: yup
        .string()
        .min(6, VALIDATION_CONSTANTS.PASSWORD_MIN_6)
        .required(VALIDATION_CONSTANTS.PASSWORD_REQUIRED),
});

export const schemaSignup = yup.object().shape({
    [FieldNameEnum.first_name]: yup.string().required(VALIDATION_CONSTANTS.FIRST_NAME_REQUIRED),
    [FieldNameEnum.last_name]: yup.string().required(VALIDATION_CONSTANTS.LAST_NAME_REQUIRED),
    [FieldNameEnum.email]: yup
        .string()
        .required(VALIDATION_CONSTANTS.EMAIL_REQUIRED)
        .matches(REGEX_RULES.EMAIL, VALIDATION_CONSTANTS.EMAIL_VALID),
    [FieldNameEnum.password]: yup
        .string()
        .min(6, VALIDATION_CONSTANTS.PASSWORD_MIN_6)
        .required(VALIDATION_CONSTANTS.PASSWORD_REQUIRED),
    [FieldNameEnum.password_confirm]: yup
        .string()
        .min(6, VALIDATION_CONSTANTS.PASSWORD_MIN_6)
        .required(VALIDATION_CONSTANTS.PASSWORD_REQUIRED)
        .oneOf(
            [yup.ref('password'), ''],
            VALIDATION_CONSTANTS.PASSWORD_CONFIRM_MATCH
        ),
});