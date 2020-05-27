export type FieldValidatorTypes = (value: string) => string | undefined

export const required: FieldValidatorTypes = (value) => {
    if (value) return undefined
    return 'Field is required'
}

export const maxLenghtCreator = (maxLenght: number): FieldValidatorTypes => value => {
    if (value && value.length <= maxLenght) return undefined
    return `max length is ${maxLenght}`
}

