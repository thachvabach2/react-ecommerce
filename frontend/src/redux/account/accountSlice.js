import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        email: '',
        phone: '',
        fullName: '',
        role: '',
        avatar: '',
        id: ''
    },
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                email: '',
                phone: '',
                fullName: '',
                role: '',
                avatar: '',
                id: ''
            }
        },
        doUpdateInfoAction: (state, action) => {
            const updatedInfo = action.payload;

            if (updatedInfo.avatar) {
                state.user = {
                    ...state.user,
                    phone: updatedInfo.phone,
                    fullName: updatedInfo.fullName,
                    avatar: updatedInfo.avatar,
                }
            } else {
                state.user = {
                    ...state.user,
                    phone: updatedInfo.phone,
                    fullName: updatedInfo.fullName,
                }
            }

        }
    },
    extraReducers: (builder) => {

    },
})

// Action creators are generated for each case reducer function
export const { doLoginAction, doGetAccountAction, doLogoutAction, doUpdateInfoAction } = accountSlice.actions

export default accountSlice.reducer