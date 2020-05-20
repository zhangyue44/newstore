import { request } from './request'

export function getHomeMultidata() { //获取首页中轮播图与推荐模块数据
    return request({ //调用封装好的函数
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) { //获取首页中Goods模块数据
    return request({ //调用封装好的函数
        url: '/home/data',
        params: {
            type,
            page,
        }
    })
}