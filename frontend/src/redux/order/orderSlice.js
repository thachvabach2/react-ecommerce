import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';

const initialState = {
    carts: []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddToCartAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            const index = carts.findIndex(c => c._id === item._id)
            if (index !== -1) {
                carts[index].quantity += item.quantity;
                if (carts[index].quantity > item.detail.quantity) {
                    carts[index].quantity = item.detail.quantity;
                }
            } else {
                carts.push(item)
            }
            // update redux
            state.carts = carts;
            message.success('Sản phẩm đã đươc thêm vào giỏ hàng')
        }
    },
    extraReducers: (builder) => {

    },
})

// Action creators are generated for each case reducer function
export const { doAddToCartAction } = orderSlice.actions

export default orderSlice.reducer