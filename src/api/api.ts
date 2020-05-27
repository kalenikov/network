import axios from 'axios'
import {UserType} from "../types/types"

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'b32560ce-19f4-42bd-ba4f-66ddeded47d9'}
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeEnumWithCaptch {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
