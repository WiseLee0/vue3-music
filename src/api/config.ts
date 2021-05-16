const urlMap = {
    development: 'http://192.168.1.3:3200/',
    production: 'https://wiselee.cn/music/'
}
export const baseUrl = urlMap[process.env.NODE_ENV]
// 歌曲图片加载失败时使用的默认图片
export const fallbackPicUrl = 'https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000'