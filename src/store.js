import { createStore, applyMiddleware } from "redux";
import channelReducer from "./reducers/channelReducer";
import thunk from "redux-thunk";

const store = createStore(channelReducer, applyMiddleware(thunk));

export default store;