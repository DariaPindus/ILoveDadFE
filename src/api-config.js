
 /*"proxy": "http://localhost:8081" was in package.json !!!*/
 /*mock files should be stored in "public" folder*/

let backendHost;
const apiVersion = 'v1';

const dataSource = "mock";	//server

if (dataSource == "server") {
  backendHost = 'http://localhost:8081';
} 
else {
  backendHost = process.env.PUBLIC_URL;
}

export const API_ROOT = `${backendHost}`;