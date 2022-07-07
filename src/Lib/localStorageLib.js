import { reactLocalStorage } from "reactjs-localstorage";
export const setToLocal = (key: String, object: Object) => {
    reactLocalStorage.setObject(key, object);
  };
export const getFromLocal = (key) => {
    return reactLocalStorage.getObject(key);
  };