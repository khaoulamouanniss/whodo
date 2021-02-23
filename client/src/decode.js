import jwt_decode from 'jwt-decode';


const decoder = () => {
  const token = localStorage.getItem("token");
  
  if (token) {
    const decoded = jwt_decode(token);
    console.log("decoded token",decoded)
    return decoded
  }
  
};

export {decoder};