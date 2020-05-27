import {instance} from "./api"

type GetCapthaURLResponseType = {
    url: string
}

export const SecurityAPI = {

    getCaptchaURL() {
        const url = `security/get-captcha-url   `
        return instance.get<GetCapthaURLResponseType>(url).then(res=>res.data)
    }
}
