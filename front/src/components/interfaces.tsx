export interface IReply {
    _id: string
    epoch: number
    writer_id: string
    writer_pseudo: string
    comment: string
}

export interface IComment {
    _id: string
    epoch: number
    writer_id: string
    writer_pseudo: string
    comment: string
    replyes: IReply[]
}

export interface IPost {
    _id: string
    epoch: number
    title: string
    category: string
    description: string
    src: string
    artist: {
        name: string
        id: string
    }
    likes: number
    views: number
    comments: IComment[]
}

export interface IUser {
    _id: string
    email: string
    pseudo: string
    password: string
    certificat: {
        valid: boolean
        code: number
    }
    liked_ids: string[]
    saved_ids: string[]
}