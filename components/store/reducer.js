export const reducer = (state, action) => {
    switch (action.type) {
        case "IS_SELECTED_MAP":
            return {
                ...state,
                active: true,
            }
        case "IS_NOT_SELECTED_MAP":
            return {
                ...state,
                active: false
            }
        default:
            return state
    }
}

export const initialState = {
    active: false
}