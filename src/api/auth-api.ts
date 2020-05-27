import {instance, APIResponseType, ResultCodeEnum, ResultCodeEnumWithCaptch} from "./api"

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    id: number

}
export const AuthAPI = {
    me() {
        const url = `auth/me`
        return instance.get<APIResponseType<MeResponseDataType>>(url).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const url = `auth/login`
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeEnumWithCaptch>>(url, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        const url = `auth/login`
        return instance.delete(url)
    }
}
