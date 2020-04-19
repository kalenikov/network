export const required = value => {
    if (value) return undefined
    return 'Field is required'
}


export const maxLenghtCreator = (maxLenght) => value => {
    if (value && value.length <=maxLenght) return undefined
    return `max length is ${maxLenght}`
}

