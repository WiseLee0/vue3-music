const urlMap = {
    development: 'http://192.168.1.3:3200/',
    production: 'https://wiselee.cn/music/'
}
export const baseUrl = urlMap[process.env.NODE_ENV]