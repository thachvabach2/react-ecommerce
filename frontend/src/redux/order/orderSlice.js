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
        },
        doUpdateCartAction: (state, action) => {
            let carts = state.carts;
            const payload = action.payload;
            console.log('>>> check payload: ', payload)

            carts[payload.index].quantity = payload.value;
        },
        doDeleteItemCartAction: (state, action) => {
            const bookId = action.payload.bookId;
            state.carts = state.carts.filter(item => item._id !== bookId);
        },
        doPlaceOrderAction: (state, action) => {
            state.carts = [];
        },
        extraReducers: (builder) => {

        },
    }
})

// Action creators are generated for each case reducer function
export const { doAddToCartAction, doUpdateCartAction, doDeleteItemCartAction, doPlaceOrderAction } = orderSlice.actions

export default orderSlice.reducer