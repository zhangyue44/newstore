const getters = {
    cartLength(state) { //返回选中的长度
        const lis = state.cartList.filter(item => {
            return item.checked
        })
        return lis.length
    },
    cartList(state) {
        return state.cartList
    }
}

export default getters