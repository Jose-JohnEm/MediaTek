
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

interface comments {
    _id: number
    writer: user
    comment: string
    replyed: comments[]
}

interface post {
    _id: number
    title: string
    category: string
    description: string
    src: string
    artist: user
    likes: number
    views: number
    comments: comments[]
}