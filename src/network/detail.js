import { request } from './request'

export function getDetail(iid) { //获取详情页数据
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export class Goodss { //将一个模块中杂乱的信息进行整合在一起，ES6中的面向对象class类
    constructor(itemInfo, columns, services) { //构造函数
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop { //商家信息
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam { //商品参数
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

export function getRecommend() { //获取详情页中的推荐模块信息
    return request({
        url: '/recommend'
    })
}