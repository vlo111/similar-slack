import { combineReducers } from 'redux';
import account from './account';
import workspace from './workspace';


export default combineReducers({
    account,
    workspace,
});
