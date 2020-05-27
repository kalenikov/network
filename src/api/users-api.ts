import {GetItemsType, instance} from "./api"
import {AxiosPromise} from "axios"

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        const url = `users?page=${currentPage}&count=${pageSize}`
        return instance.get<GetItemsType>(url).then(response => response.data)
    },
    follow(userId: number) {
        const url = `follow/${userId}`
        return instance.post<ResponseType>(url).then(res => res.data)
    },
    unfollow(userId: number) {
        const url = `follow/${userId}`
        return instance.delete(url).then(res => res.data) as Promise<ResponseType>
    },

}
