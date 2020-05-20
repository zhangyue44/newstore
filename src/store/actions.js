const actions = {
    addToCart(context, payload) { //加入购物车传入的一个函数
        return new Promise((resolve, reject) => {
            //查找数组中是否有该商品，没有返回false，有返回数组中匹配的对象
            const oldProduct = context.state.cartList.find(item => item.iid == payload.iid);
            if (oldProduct) {
                context.commit('addCounter', oldProduct) //oldProduct.count++ 
            } else {
                context.commit('addpayload', payload) //context.state.cartList.push(payload)
            }
            resolve()
        })
    },
}

export default actions