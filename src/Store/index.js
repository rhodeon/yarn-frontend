import { createStore, applyMiddleware, compose, combineReducers} from 'redux';

import sidebarReducer from "./Reducers/sidebarReducer"
import mobileSidebarReducer from "./Reducers/mobileSidebarReducer"
import profileSidebarReducer from "./Reducers/profileSidebarReducer"
import mobileProfileSidebarReducer from "./Reducers/mobileProfileSidebarReducer"
import pageTourReducer from "./Reducers/pageTourReducer"
import selectedChatReducer from "./Reducers/selectedChatReducer"
import authReducer from "./Reducers/authReducer"
import disconnectedReducer from "./Reducers/disconnectedReducer"
import friendRuducer from "./Reducers/friendReducer"
import thunk from 'redux-thunk';

const reducers = combineReducers({
    selectedSidebar: sidebarReducer,
    mobileSidebar: mobileSidebarReducer,
    profileSidebar: profileSidebarReducer,
    mobileProfileSidebar: mobileProfileSidebarReducer,
    pageTour: pageTourReducer,
    selectedChat: selectedChatReducer,
    auth: authReducer,
    friends: friendRuducer,
    disconnected: disconnectedReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

// const store = createStore(reducers);

export default store
