import type { NextApiRequest, NextApiResponse } from "next"
// @ts-ignore
import Instagram from 'instagram-web-api'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(process.env.NEXT_PUBLIC_USERNAME," ",process.env.NEXT_PUBLIC_PASSWORD)
    const client = new Instagram({
    username: process.env.NEXT_PUBLIC_USERNAME,
    password: process.env.NEXT_PUBLIC_PASSWORD
})

    if (req.method === 'POST') {
        await client.login()
        const photo: string = "https://res.cloudinary.com/confused-bachlors/image/upload/v1638694757/250388804_641432683685989_3534121723771323894_n_i38cwf.jpg";

        try {
            await client.uploadPhoto({
                photo: photo,
                caption: "This is a caption",
                post: 'feed'
            })
            res.status(200).json({ message: 'ok' })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'error' })
        }
    }
}
