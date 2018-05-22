
// 引用axios
var axios = require("axios");

// 引用 qs模块
var qs = require("qs");

// 配置API接口地址
window.rootURL = "http://localhost/beeerp/fba/";
// var root = "http://localhost/beeerp/fba/";

/*  接口处理函数  */
function apiAxios(method, url, params, callback) {
    if(method === "POST" || method === "PUT"){
        params = qs.stringify(params);
    }
    axios({
        method: method,
        url: url,
        data: method === "POST" || method === "PUT" ? params : null,
        params: method === "GET" || method === "DELETE" ? params : null,
        baseURL: rootURL,
        withCredentials: true
    })
    .then(function (res) {
        // if (res.data.status == 0) {
        //     if (success) {
        //         success(res.data)
        //     }
        // } else {
        //     if (failure) {
        //         failure(res.data)
        //     }
        // }
        if(callback){
            callback(res.data);
        }
    })
    .catch(function (err) {
        let res = err.response;
        if (err) {
            // console.log("request error, status code: " + res.status)
        }
    })
}

// 返回在vue模板中的调用接口

// export default {
//     get: function (url, params, success, failure) {
//         return apiAxios("GET", url, params, success, failure)
//     },
//     post: function (url, params, success, failure) {
//         return apiAxios("POST", url, params, success, failure)
//     },
//     put: function (url, params, success, failure) {
//         return apiAxios("PUT", url, params, success, failure)
//     },
//     delete: function (url, params, success, failure) {
//         return apiAxios("DELETE", url, params, success, failure)
//     }
// }

export default {
    get: function (url, params, callback) {
        return apiAxios("GET", url, params, callback)
    },
    post: function (url, params, callback) {
        return apiAxios("POST", url, params, callback)
    },
    put: function (url, params, callback) {
        return apiAxios("PUT", url, params, callback)
    },
    delete: function (url, params, callback) {
        return apiAxios("DELETE", url, params, callback)
    }
}
