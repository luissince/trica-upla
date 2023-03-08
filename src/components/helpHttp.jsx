export const helpHttp = () => {
    const customFetch  = async (endpoint, options) => {
   
     var token = JSON.parse(localStorage.getItem("datosUsuario"));
      const defaultHeader = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };  
      const controller = new AbortController();
   options.signal = controller.signal;
  
      options.method = options.method || "GET";
      options.headers = options.headers
        ? { ...defaultHeader, ...options.headers }
        : defaultHeader;
  
      options.body = JSON.stringify(options.body) || false;
     options.body = options.body || false;
     if (!options.body) delete options.body;  
   
      setTimeout(() => controller.abort(), 60000);
  
    //  return await axios(endpoint, options);
      return await fetch(process.env.URL+endpoint, options)
        .then((res) => 
              res.ok
            ? res.json()
            : Promise.reject({
                err: true,
                status: res.status || "00",
                statusText: res.statusText || "Ocurrió un error",                
              })            
        )
        .catch((err) => err);
    };
  
    const get = (url, options = {}) => customFetch(url, options);
  
    const post = (url, options = {}) => {
      options.method = "POST";
      return customFetch(url, options);
    };
  
    const put = (url, options = {}) => {
      options.method = "PUT";
      return customFetch(url, options);
    };
  
    const del = (url, options = {}) => {
      options.method = "DELETE";
      return customFetch(url, options);
    };
  
    return {
      get,
      post,
      put,
      del,
    };
  };