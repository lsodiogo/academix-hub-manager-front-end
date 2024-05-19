async function fetchData(endpoint, method, body) {
   
   const options = {
      method,
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include"
   };

   if (body) {
      options.body = JSON.stringify(body);
   };

   // TO DO: change local path to server path
   const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

   const response = await fetch(baseDomain + endpoint, options);
   const result = await response.json();

   return result;
};


export default {
   fetchData
};