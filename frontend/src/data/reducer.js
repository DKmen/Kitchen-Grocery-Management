import { combineReducers } from "redux";

import * as Payload from "../constant/";

const userInisialState = {
  login: false,
  userName: null,
  email: null,
};

const categoryInisialState = [];

const product = (state = [], action) => {
  switch (action.type) {
    case Payload.CREATE_PRODUCT:
      return [...state, action.payload];
    case Payload.FETCH_PRODUCT:
      return [...action.payload]
    case Payload.DELETE_PRODUCT:
      return state.filter((item)=>{
        return item.id!==action.payload.id
      })
    default:
      return state;
  }
};

const user = (state = userInisialState, action) => {
  switch (action.type) {
    case Payload.FETCH_USER:
      state.login = true;
      state.userName = action.payload.data.userName;
      state.email = action.payload.data.userEmail;
      return state;
    case Payload.LOGIN_USER:
      state.login = true;
      state.userName = action.payload.data.userName;
      state.email = action.payload.data.userEmail;
      return state;
    case Payload.SINGUP_USER:
      state.login = true;
      state.userName = action.payload.data.userName;
      state.email = action.payload.data.userEmail;
      return state;
    case Payload.LOGOUT_USER:
      state.login = false;
      state.userName = null;
      state.email = null;
      return state;
    default:
      return state;
  }
};

const category = (state = categoryInisialState, action) => {
  switch (action.type) {
    case Payload.CREATE_CATEGORY:
      return [...state, action.payload];
    case Payload.DELETE_CATEGORY:
      return state.filter((item) => item.id !== action.payload.id);
    case Payload.MODIFY_CATEGORY:
      return state.map((item) => {
        if (item.id === action.payload.id)
          item.categoryName = action.payload.categoryName;
        return item;
      });
    case Payload.FETCH_CATEGORY:
      return [...action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  user: user,
  category: category,
  product: product,
});
