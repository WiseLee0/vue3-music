import axios from "axios"
import { baseUrl } from "./config"

export const getBanner = async () => {
    const url = baseUrl + 'getDigitalAlbumLists'
    const res = await axios.get(url)
    const banner = res.data.response.data.banner.map(item => {
        const { picurl, jumpurl } = item
        const albummid = jumpurl.match(/mid=(.+)&/)[1]
        return {
            albummid,
            picurl
        }
    })
    return banner
}

export const getHotDiscRecommend = async (page = 1, limit = 10) => {
    const url = baseUrl + 'getSongLists'
    const res = await axios.get(url, {
        params: {
            categoryId: 10000000,
            sortId: 3,
            page,
            limit
        }
    })
    const ablums = res.data.response.data.list.map(r => {
        return {
            title: r.dissname,
            id: r.dissid,
            cover: r.imgurl,
            listen: r.listennum,
            username: r.creator.name
        }
    })
    return ablums
}