"use strict";

const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

/*************************************************************************/
//首先
const express = require("express");
const app = express();
// var appData = require("../src/assets/json/appData.json")             // 加载本地数据文件
var region = require("../src/assets/json/region.json");                 // 加载本地数据文件  省市区数据
var country = require("../src/assets/json/country.json");               // 加载本地数据文件  国家数据
var forbidInfo = require("../src/assets/json/forbidInfo.json");         // 加载本地数据文件  违禁品数据
var amazonInfo = require("../src/assets/json/amazonInfo.json");         // 加载本地数据文件  亚马逊标准数据
var planData = require("../src/assets/json/planData.json");             // 加载本地数据文件  推荐方案数据
var orderData = require("../src/assets/json/orderData.json");           // 加载本地数据文件  我的订单数据
var logInfoData = require("../src/assets/json/logInfoData.json");       // 加载本地数据文件  系统信息数据
var senderData = require("../src/assets/json/senderData.json");         // 加载本地数据文件  发件人数据
var receiverStore = require("../src/assets/json/receiverStore.json");   // 加载本地数据文件  收件人仓库数据
var accountData = require("../src/assets/json/accountData.json");       // 加载本地数据文件  我的账户数据
// var seller = appData.seller
// var goods = appData.goods
// var ratings = appData.ratings
var router = express.Router();
// app.use("/api",router);
app.use("/data", router);
// app.use(router);
/*************************************************************************/

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: "warning",
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? {warnings: false, errors: true} : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        },
        before(app) {
            // 请求的url 路径可以自定义  比如 "/planData"
            app.get("/data/region", (req, res) => { // get请求
                res.json(region);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.get("/data/country", (req, res) => { // get请求
                res.json(country);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.get("/data/forbidInfo", (req, res) => { // get请求
                res.json(forbidInfo);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.get("/data/amazonInfo", (req, res) => { // get请求
                res.json(amazonInfo);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.post("/data/planData", (req, res) => { // post请求
                res.json(planData);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.post("/data/orderData", (req, res) => { // post请求
                res.json(orderData);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.post("/data/logInfoData", (req, res) => { // post请求
                res.json(logInfoData);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.post("/data/senderData", (req, res) => { // post请求
                res.json(senderData);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.post("/data/receiverStore", (req, res) => { // post请求
                res.json(receiverStore);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            app.post("/data/accountData", (req, res) => { // post请求
                res.json(accountData);   //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            });
            // app.get("/api/seller", (req, res) => {
            //     res.json({
            //         errno: 0,
            //         data: seller
            //     })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            // }),
            // app.get("/api/goods", (req, res) => {
            //     res.json({
            //         errno: 0,
            //         data: goods
            //     })
            // }),
            // app.get("/api/ratings", (req, res) => {
            //     res.json({
            //         errno: 0,
            //         data: ratings
            //     })
            // })
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": require("../config/dev.env")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }));
            resolve(devWebpackConfig)
        }
    })
});
