export const SET_TARGET_POST = "SET_TARGET_POST";

export const setTargetPost = postId => {
    return {
        type: SET_TARGET_POST,
        postId
    }
}