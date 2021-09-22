const initialState={
    user:null,
}

const userReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "SET_USER":
            return{
                user:action.user
            }   
            case "LOG_OUT":
                return{
                    user:null
                }
        default:
            return state;
    }
}

export default userReducer;