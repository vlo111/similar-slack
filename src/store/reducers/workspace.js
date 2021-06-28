import {
    GET_WORKSPACES
} from '../actions/workspace';


const initialState = {
    workspaces: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WORKSPACES.SUCCESS:{
            const {
                workspaces,
            } = action.payload.data;
            return {
                ...state, workspaces,
            };
        }
        default: {
            return { ...state };
        }
    }
}
