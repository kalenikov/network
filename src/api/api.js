import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'b32560ce-19f4-42bd-ba4f-66ddeded47d9'}
})

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        const url = `users?page=${currentPage}&count=${pageSize}`
        return instance.get(url).then(response => response.data)
    },
    follow(userId) {
        const url = `follow/${userId}`
        return instance.post(url)
    },
    unfollow(userId) {
        const url = `follow/${userId}`
        return instance.delete(url)
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        const url = `profile/${userId}`
        return instance.get(url)
    },
    getStatus(userId) {
        const url = `profile/status/${userId}`
        return instance.get(url)
    },
    updateStatus(status) {
        const url = `profile/status/`
        return instance.put(url, {status})
    }

}

export const AuthAPI = {
    me() {
        const url = `auth/me`
        return instance.get(url)
    },
    login(email, password, rememberMe = false){
        const url = `auth/login`
        return instance.post(url, {email, password, rememberMe})
    },
    logout(email, password, rememberMe = false){
        const url = `auth/login`
        return instance.delete(url)
    }
}