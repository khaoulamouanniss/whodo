import jwt_decode from 'jwt-decode';


const decoder = () => {
  const token = localStorage.getItem("token");
  
  if (token) {
    const decoded = jwtDecode(token);
    console.log("decoded token",decoded)
    return decoded
  }
  
};


const getLocalStorage = () => {
  const localData = localStorage.getItem("token")
  return localData;
}
export {decodeUser, getLocalStorage};