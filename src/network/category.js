import { request } from './request'


export function getCategory() { //获取分类数据
    return request({
        url: '/category'
    })
}

export function getSubcategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

export function getCategoryDetail(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}