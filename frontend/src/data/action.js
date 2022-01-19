import Cookies from "js-cookie";
import * as Payload from "../constant/";
import axios from "axios";

const MakeRequest = async (data, token, URL, method) => {
  let Responce;
  if (method === "GET" || method === "get") {
    Responce = await fetch(URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });
  } else {
    Responce = await fetch(URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: method,
      body: JSON.stringify(data),
    });
  }

  return await Responce.json();
};

export const FetchUser = (data) => {
  return (dispatch) => {
    dispatch({
      type: Payload.FETCH_USER,
      payload: data,
    });
  };
};

export const SingupUser = (data) => {
  return async (dispatch) => {
    const responceData = await MakeRequest(
      data,
      "",
      "http://localhost:3050/v1/user/create",
      "POST"
    );
    Cookies.set("token", responceData.token, {
      expires: new Date(Date.now() + responceData.expire * 24 * 60 * 60 * 1000),
    });
    dispatch({
      type: Payload.SINGUP_USER,
      payload: responceData,
    });
  };
};

export const LoginUser = (data) => {
  return async (dispatch) => {
    const responceData = await MakeRequest(
      data,
      "",
      "http://localhost:3050/v1/user/login",
      "POST"
    );
    Cookies.set("token", responceData.token, {
      expires: new Date(Date.now() + responceData.expire * 24 * 60 * 60 * 1000),
    });
    dispatch({
      type: Payload.LOGIN_USER,
      payload: responceData,
    });
  };
};

export const LogOutUser = () => {
  return (dispatch) => {
    Cookies.remove("token");
    dispatch({
      type: Payload.LOGOUT_USER,
    });
  };
};

export const CreateCategory = (data) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    const responceData = await MakeRequest(
      data,
      token,
      "http://localhost:3050/v1/category/create",
      "POST"
    );
    dispatch({
      type: Payload.CREATE_CATEGORY,
      payload: responceData.data,
    });
  };
};

export const DeleteCategory = (id) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    await MakeRequest(
      {},
      token,
      `http://localhost:3050/v1/category/delete/${id}`,
      "delete"
    );

    dispatch({
      type: Payload.DELETE_CATEGORY,
      payload: { id: id },
    });
  };
};

export const EditCategory = (id, data) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    await axios.patch(
      `http://localhost:3050/v1/category/modify/${id}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: Payload.MODIFY_CATEGORY,
      payload: {
        id: id,
        categoryName: data.categoryName,
      },
    });
  };
};

export const FetchCategory = () => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    const responceData = await MakeRequest(
      "",
      token,
      "http://localhost:3050/v1/category/categorys",
      "GET"
    );
    dispatch({
      type: Payload.FETCH_CATEGORY,
      payload: responceData.data,
    });
  };
};

export const CreateProduct = (data) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    const responce = await axios.post(
      `http://localhost:3050/v1/product/create`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: Payload.CREATE_PRODUCT,
      payload: responce.data.data,
    });
  };
};

export const DeleteProduct = (id) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    await axios.delete(
      `http://localhost:3050/v1/product/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type:Payload.DELETE_PRODUCT,
      payload:{id:id}
    })
  };
};

export const FetchProduct = (id) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    const responce = await axios.get(
      `http://localhost:3050/v1/product/categorys/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: Payload.FETCH_PRODUCT,
      payload: responce.data.data,
    });
  };
};
