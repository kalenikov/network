export type PostType = {
    id: number,
    message: string,
    likesCount: number
}
export type ContactType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    maibnLink: string,
}
export type PhotosType = {
    small: string | null,
    lagre: string | null,
}
export type ProfileType = {
    userId: number,
    lookingForAJob: string,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactType,
    photos: PhotosType
}
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType
    followed: boolean
}
