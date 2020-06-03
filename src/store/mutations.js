const mutations = {
    addCounter(state, payload) {
        payload.count++
    },
    addpayload(state, payload) {
        // payload.count = 1;
        payload.checked = true; //商品加进去时就是已经选择
        state.cartList.push(payload)
    },
    check(state, payload) { //购物车中按钮选中与不选中进行切换
        payload.checked = !payload.checked
    },
}

export default mutations