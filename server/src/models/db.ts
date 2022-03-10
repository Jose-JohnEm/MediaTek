
interface user {
    _id: number
    email: string
    pseudo: string
    password: string
    token: string
    certificat: {
        valid: boolean
        code: number
    }
    liked: number[]
    saved: number[]
}

interface reply {
    _id: number
    epoch: number
    writer_id: number
    comment: string
}

interface comments {
    _id: number
    epoch: number
    writer_id: number
    comment: string
    replyed: reply[]
}

interface post {
    _id: number
    epoch: number
    title: string
    category: string
    description: string
    src: string
    artist: user
    likes: number
    views: number
    comments: comments[]
}