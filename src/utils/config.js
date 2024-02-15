const config = {
     headers:{"Content-Type": "application/json",
              "Accept": "application/json",
           
     },
    //  host:"http://localhost:6167",
    host: process.env.REACT_APP_BE_HOST,
    // host:"http://192.168.29.180:6167",
} 


export default config;


