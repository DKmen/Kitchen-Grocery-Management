import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reducers from "./data/reducer.js";

import LoginPage from "./screen/User/Login";
import SingupPage from "./screen/User/Singup";
import DashbordPage from "./screen/Dashbord/Dashbord"
import CategoryPage from "./screen/Dashbord/Category.js";
import ProductPage from "./screen/Dashbord/Product.js";


const store = createStore(reducers, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="singup" exect element={<SingupPage />} />
          <Route path="login" exect element={<LoginPage />} />
          <Route path="" exect element={<DashbordPage/>}/>
          <Route path="category" exect element={<CategoryPage/>}/>
          <Route path='product/:categoryId' exect element={<ProductPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
