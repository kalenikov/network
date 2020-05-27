import {PhotosType, ProfileType} from "../types/types"
import {instance, APIResponseType} from "./api"

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        const url = `profile/${userId}`
        return instance.get<ProfileType>(url).then(res => res.data)
    },
    getStatus(userId: number) {
        const url = `profile/status/${userId}`
        return instance.get<string>(url).then(res => res.data)
    },
    updateStatus(status: string) {
        const url = `profile/status/`
        return instance.put<APIResponseType>(url, {status}).then(res => res.data)
    },
    savePhoto(file: File) {
        const url = `profile/photo/`
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<APIResponseType<SavePhotoResponseType>>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        const url = `profile`
        return instance.put<APIResponseType>(url, profile).then(res => res.data)
    },

}
