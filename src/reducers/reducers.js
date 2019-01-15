import { SET_TARGET_POST } from "../actions/actions";

const reducers = (state = "", action) => {
    const { postId } = action;

    switch (action.type) {
        case SET_TARGET_POST:
            console.log("postID: ", postId);
            return postId;
        default:
            return state;
    }
}

export default reducers;