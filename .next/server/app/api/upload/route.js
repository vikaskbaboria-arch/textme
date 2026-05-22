"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/upload/route";
exports.ids = ["app/api/upload/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "./action-async-storage.external?8dda":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?3d59":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?16bc":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.js&appDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.js&appDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_vikas_baboria_Downloads_textme_textme_app_api_upload_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload/route.js */ \"(rsc)/./app/api/upload/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/route\",\n        pathname: \"/api/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\vikas baboria\\\\Downloads\\\\textme\\\\textme\\\\app\\\\api\\\\upload\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_vikas_baboria_Downloads_textme_textme_app_api_upload_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/upload/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN2aWthcyUyMGJhYm9yaWElNUNEb3dubG9hZHMlNUN0ZXh0bWUlNUN0ZXh0bWUlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3Zpa2FzJTIwYmFib3JpYSU1Q0Rvd25sb2FkcyU1Q3RleHRtZSU1Q3RleHRtZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDK0I7QUFDNUc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXh0bWUvP2E3OWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcdmlrYXMgYmFib3JpYVxcXFxEb3dubG9hZHNcXFxcdGV4dG1lXFxcXHRleHRtZVxcXFxhcHBcXFxcYXBpXFxcXHVwbG9hZFxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXBsb2FkL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXBsb2FkXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS91cGxvYWQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFx2aWthcyBiYWJvcmlhXFxcXERvd25sb2Fkc1xcXFx0ZXh0bWVcXFxcdGV4dG1lXFxcXGFwcFxcXFxhcGlcXFxcdXBsb2FkXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91cGxvYWQvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.js&appDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.js":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongoose */ \"(rsc)/./lib/mongoose.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.js\");\n\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                await (0,_lib_mongoose__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n                    email: credentials.email\n                }).select(\"+password\");\n                if (!user) throw new Error(\"No account found with this email\");\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                if (!isValid) throw new Error(\"Incorrect password\");\n                return {\n                    id: user._id.toString(),\n                    name: user.name,\n                    email: user.email,\n                    avatar: user.avatar\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.avatar = user.avatar;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.avatar = token.avatar;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWdDO0FBQ2lDO0FBQ3BDO0FBQ1M7QUFDTjtBQUV6QixNQUFNSyxjQUFjO0lBQ3pCQyxXQUFXO1FBQ1RMLDJFQUFtQkEsQ0FBQztZQUNsQk0sTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLE1BQU1MLHlEQUFTQTtnQkFFZixNQUFNVyxPQUFPLE1BQU1WLG9EQUFJQSxDQUFDVyxPQUFPLENBQUM7b0JBQUVOLE9BQU9ELFlBQVlDLEtBQUs7Z0JBQUMsR0FBR08sTUFBTSxDQUFDO2dCQUVyRSxJQUFJLENBQUNGLE1BQU0sTUFBTSxJQUFJRyxNQUFNO2dCQUUzQixNQUFNQyxVQUFVLE1BQU1oQix1REFBYyxDQUFDTSxZQUFZSSxRQUFRLEVBQUVFLEtBQUtGLFFBQVE7Z0JBQ3hFLElBQUksQ0FBQ00sU0FBUyxNQUFNLElBQUlELE1BQU07Z0JBRTlCLE9BQU87b0JBQ0xHLElBQUlOLEtBQUtPLEdBQUcsQ0FBQ0MsUUFBUTtvQkFDckJmLE1BQU1PLEtBQUtQLElBQUk7b0JBQ2ZFLE9BQU9LLEtBQUtMLEtBQUs7b0JBQ2pCYyxRQUFRVCxLQUFLUyxNQUFNO2dCQUNyQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVaLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSWSxNQUFNTixFQUFFLEdBQUdOLEtBQUtNLEVBQUU7Z0JBQ2xCTSxNQUFNSCxNQUFNLEdBQUdULEtBQUtTLE1BQU07WUFDNUI7WUFDQSxPQUFPRztRQUNUO1FBQ0EsTUFBTUMsU0FBUSxFQUFFQSxPQUFPLEVBQUVELEtBQUssRUFBRTtZQUM5QixJQUFJQSxPQUFPO2dCQUNUQyxRQUFRYixJQUFJLENBQUNNLEVBQUUsR0FBR00sTUFBTU4sRUFBRTtnQkFDMUJPLFFBQVFiLElBQUksQ0FBQ1MsTUFBTSxHQUFHRyxNQUFNSCxNQUFNO1lBQ3BDO1lBQ0EsT0FBT0k7UUFDVDtJQUNGO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtRQUNSQyxPQUFPO0lBQ1Q7SUFDQUgsU0FBUztRQUNQSSxVQUFVO0lBQ1o7SUFDQUMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0FBQ3JDLEVBQUM7QUFFRCxNQUFNQyxVQUFVcEMsZ0RBQVFBLENBQUNLO0FBQ2lCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGV4dG1lLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanM/ZGExYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gJ0AvbGliL21vbmdvb3NlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnQC9tb2RlbHMvVXNlcidcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6ICdDcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBhd2FpdCBkYkNvbm5lY3QoKVxuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSkuc2VsZWN0KCcrcGFzc3dvcmQnKVxuXG4gICAgICAgIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKCdObyBhY2NvdW50IGZvdW5kIHdpdGggdGhpcyBlbWFpbCcpXG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKVxuICAgICAgICBpZiAoIWlzVmFsaWQpIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IHBhc3N3b3JkJylcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBhdmF0YXI6IHVzZXIuYXZhdGFyLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWRcbiAgICAgICAgdG9rZW4uYXZhdGFyID0gdXNlci5hdmF0YXJcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZFxuICAgICAgICBzZXNzaW9uLnVzZXIuYXZhdGFyID0gdG9rZW4uYXZhdGFyXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgICBlcnJvcjogJy9sb2dpbicsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufVxuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJkYkNvbm5lY3QiLCJVc2VyIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmRPbmUiLCJzZWxlY3QiLCJFcnJvciIsImlzVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsImF2YXRhciIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzdHJhdGVneSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./app/api/upload/route.js":
/*!*********************************!*\
  !*** ./app/api/upload/route.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/api/auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.js\");\n/* harmony import */ var _lib_cloudinary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/cloudinary */ \"(rsc)/./lib/cloudinary.js\");\n\n\n\n\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n        const formData = await req.formData();\n        const file = formData.get(\"file\");\n        const folder = formData.get(\"folder\") || \"textme/media\";\n        if (!file) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"No file provided\"\n        }, {\n            status: 400\n        });\n        const bytes = await file.arrayBuffer();\n        const buffer = Buffer.from(bytes);\n        const base64 = buffer.toString(\"base64\");\n        const mimeType = file.type;\n        const dataURI = `data:${mimeType};base64,${base64}`;\n        const isVideo = mimeType.startsWith(\"video/\");\n        const resourceType = isVideo ? \"video\" : \"image\";\n        const result = await _lib_cloudinary__WEBPACK_IMPORTED_MODULE_3__[\"default\"].uploader.upload(dataURI, {\n            folder,\n            resource_type: resourceType,\n            ...resourceType === \"image\" && {\n                transformation: [\n                    {\n                        quality: \"auto\",\n                        fetch_format: \"auto\",\n                        width: 1200,\n                        crop: \"limit\"\n                    }\n                ]\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            url: result.secure_url,\n            publicId: result.public_id,\n            resourceType,\n            width: result.width,\n            height: result.height,\n            format: result.format,\n            bytes: result.bytes,\n            duration: result.duration || null\n        });\n    } catch (err) {\n        console.error(\"Upload error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Upload failed\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEM7QUFDRTtBQUNvQjtBQUN2QjtBQUVsQyxlQUFlSSxLQUFLQyxHQUFHO0lBQzVCLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1MLDJEQUFnQkEsQ0FBQ0MscUVBQVdBO1FBQ2xELElBQUksQ0FBQ0ksU0FBUyxPQUFPTixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtRQUVoRixNQUFNQyxXQUFXLE1BQU1MLElBQUlLLFFBQVE7UUFDbkMsTUFBTUMsT0FBT0QsU0FBU0UsR0FBRyxDQUFDO1FBQzFCLE1BQU1DLFNBQVNILFNBQVNFLEdBQUcsQ0FBQyxhQUFhO1FBRXpDLElBQUksQ0FBQ0QsTUFBTSxPQUFPWCxxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBbUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7UUFFakYsTUFBTUssUUFBUSxNQUFNSCxLQUFLSSxXQUFXO1FBQ3BDLE1BQU1DLFNBQVNDLE9BQU9DLElBQUksQ0FBQ0o7UUFDM0IsTUFBTUssU0FBU0gsT0FBT0ksUUFBUSxDQUFDO1FBQy9CLE1BQU1DLFdBQVdWLEtBQUtXLElBQUk7UUFDMUIsTUFBTUMsVUFBVSxDQUFDLEtBQUssRUFBRUYsU0FBUyxRQUFRLEVBQUVGLE9BQU8sQ0FBQztRQUVuRCxNQUFNSyxVQUFVSCxTQUFTSSxVQUFVLENBQUM7UUFDcEMsTUFBTUMsZUFBZUYsVUFBVSxVQUFVO1FBRXpDLE1BQU1HLFNBQVMsTUFBTXhCLHVEQUFVQSxDQUFDeUIsUUFBUSxDQUFDQyxNQUFNLENBQUNOLFNBQVM7WUFDdkRWO1lBQ0FpQixlQUFlSjtZQUNmLEdBQUlBLGlCQUFpQixXQUFXO2dCQUM5QkssZ0JBQWdCO29CQUFDO3dCQUFFQyxTQUFTO3dCQUFRQyxjQUFjO3dCQUFRQyxPQUFPO3dCQUFNQyxNQUFNO29CQUFRO2lCQUFFO1lBQ3pGLENBQUM7UUFDSDtRQUVBLE9BQU9uQyxxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQ3ZCNkIsS0FBS1QsT0FBT1UsVUFBVTtZQUN0QkMsVUFBVVgsT0FBT1ksU0FBUztZQUMxQmI7WUFDQVEsT0FBT1AsT0FBT08sS0FBSztZQUNuQk0sUUFBUWIsT0FBT2EsTUFBTTtZQUNyQkMsUUFBUWQsT0FBT2MsTUFBTTtZQUNyQjNCLE9BQU9hLE9BQU9iLEtBQUs7WUFDbkI0QixVQUFVZixPQUFPZSxRQUFRLElBQUk7UUFDL0I7SUFDRixFQUFFLE9BQU9DLEtBQUs7UUFDWkMsUUFBUXBDLEtBQUssQ0FBQyxpQkFBaUJtQztRQUMvQixPQUFPM0MscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWdCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXh0bWUvLi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS5qcz82ZWRhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZSdcbmltcG9ydCBjbG91ZGluYXJ5IGZyb20gJ0AvbGliL2Nsb3VkaW5hcnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICAgIGlmICghc2Vzc2lvbikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSlcblxuICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxLmZvcm1EYXRhKClcbiAgICBjb25zdCBmaWxlID0gZm9ybURhdGEuZ2V0KCdmaWxlJylcbiAgICBjb25zdCBmb2xkZXIgPSBmb3JtRGF0YS5nZXQoJ2ZvbGRlcicpIHx8ICd0ZXh0bWUvbWVkaWEnXG5cbiAgICBpZiAoIWZpbGUpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm8gZmlsZSBwcm92aWRlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KVxuXG4gICAgY29uc3QgYnl0ZXMgPSBhd2FpdCBmaWxlLmFycmF5QnVmZmVyKClcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShieXRlcylcbiAgICBjb25zdCBiYXNlNjQgPSBidWZmZXIudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgY29uc3QgbWltZVR5cGUgPSBmaWxlLnR5cGVcbiAgICBjb25zdCBkYXRhVVJJID0gYGRhdGE6JHttaW1lVHlwZX07YmFzZTY0LCR7YmFzZTY0fWBcblxuICAgIGNvbnN0IGlzVmlkZW8gPSBtaW1lVHlwZS5zdGFydHNXaXRoKCd2aWRlby8nKVxuICAgIGNvbnN0IHJlc291cmNlVHlwZSA9IGlzVmlkZW8gPyAndmlkZW8nIDogJ2ltYWdlJ1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xvdWRpbmFyeS51cGxvYWRlci51cGxvYWQoZGF0YVVSSSwge1xuICAgICAgZm9sZGVyLFxuICAgICAgcmVzb3VyY2VfdHlwZTogcmVzb3VyY2VUeXBlLFxuICAgICAgLi4uKHJlc291cmNlVHlwZSA9PT0gJ2ltYWdlJyAmJiB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uOiBbeyBxdWFsaXR5OiAnYXV0bycsIGZldGNoX2Zvcm1hdDogJ2F1dG8nLCB3aWR0aDogMTIwMCwgY3JvcDogJ2xpbWl0JyB9XSxcbiAgICAgIH0pLFxuICAgIH0pXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgdXJsOiByZXN1bHQuc2VjdXJlX3VybCxcbiAgICAgIHB1YmxpY0lkOiByZXN1bHQucHVibGljX2lkLFxuICAgICAgcmVzb3VyY2VUeXBlLFxuICAgICAgd2lkdGg6IHJlc3VsdC53aWR0aCxcbiAgICAgIGhlaWdodDogcmVzdWx0LmhlaWdodCxcbiAgICAgIGZvcm1hdDogcmVzdWx0LmZvcm1hdCxcbiAgICAgIGJ5dGVzOiByZXN1bHQuYnl0ZXMsXG4gICAgICBkdXJhdGlvbjogcmVzdWx0LmR1cmF0aW9uIHx8IG51bGwsXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignVXBsb2FkIGVycm9yOicsIGVycilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VwbG9hZCBmYWlsZWQnIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsImNsb3VkaW5hcnkiLCJQT1NUIiwicmVxIiwic2Vzc2lvbiIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImZvcm1EYXRhIiwiZmlsZSIsImdldCIsImZvbGRlciIsImJ5dGVzIiwiYXJyYXlCdWZmZXIiLCJidWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwiYmFzZTY0IiwidG9TdHJpbmciLCJtaW1lVHlwZSIsInR5cGUiLCJkYXRhVVJJIiwiaXNWaWRlbyIsInN0YXJ0c1dpdGgiLCJyZXNvdXJjZVR5cGUiLCJyZXN1bHQiLCJ1cGxvYWRlciIsInVwbG9hZCIsInJlc291cmNlX3R5cGUiLCJ0cmFuc2Zvcm1hdGlvbiIsInF1YWxpdHkiLCJmZXRjaF9mb3JtYXQiLCJ3aWR0aCIsImNyb3AiLCJ1cmwiLCJzZWN1cmVfdXJsIiwicHVibGljSWQiLCJwdWJsaWNfaWQiLCJoZWlnaHQiLCJmb3JtYXQiLCJkdXJhdGlvbiIsImVyciIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/cloudinary.js":
/*!***************************!*\
  !*** ./lib/cloudinary.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cloudinary */ \"(rsc)/./node_modules/cloudinary/cloudinary.js\");\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cloudinary__WEBPACK_IMPORTED_MODULE_0__);\n\ncloudinary__WEBPACK_IMPORTED_MODULE_0__.v2.config({\n    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,\n    api_key: process.env.CLOUDINARY_API_KEY,\n    api_secret: process.env.CLOUDINARY_API_SECRET\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloudinary__WEBPACK_IMPORTED_MODULE_0__.v2);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvY2xvdWRpbmFyeS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFFN0NDLDBDQUFVQSxDQUFDQyxNQUFNLENBQUM7SUFDaEJDLFlBQVlDLFFBQVFDLEdBQUcsQ0FBQ0MscUJBQXFCO0lBQzdDQyxTQUFTSCxRQUFRQyxHQUFHLENBQUNHLGtCQUFrQjtJQUN2Q0MsWUFBWUwsUUFBUUMsR0FBRyxDQUFDSyxxQkFBcUI7QUFDL0M7QUFFQSxpRUFBZVQsMENBQVVBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXh0bWUvLi9saWIvY2xvdWRpbmFyeS5qcz81MDUyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHYyIGFzIGNsb3VkaW5hcnkgfSBmcm9tICdjbG91ZGluYXJ5J1xuXG5jbG91ZGluYXJ5LmNvbmZpZyh7XG4gIGNsb3VkX25hbWU6IHByb2Nlc3MuZW52LkNMT1VESU5BUllfQ0xPVURfTkFNRSxcbiAgYXBpX2tleTogcHJvY2Vzcy5lbnYuQ0xPVURJTkFSWV9BUElfS0VZLFxuICBhcGlfc2VjcmV0OiBwcm9jZXNzLmVudi5DTE9VRElOQVJZX0FQSV9TRUNSRVQsXG59KVxuXG5leHBvcnQgZGVmYXVsdCBjbG91ZGluYXJ5XG4iXSwibmFtZXMiOlsidjIiLCJjbG91ZGluYXJ5IiwiY29uZmlnIiwiY2xvdWRfbmFtZSIsInByb2Nlc3MiLCJlbnYiLCJDTE9VRElOQVJZX0NMT1VEX05BTUUiLCJhcGlfa2V5IiwiQ0xPVURJTkFSWV9BUElfS0VZIiwiYXBpX3NlY3JldCIsIkNMT1VESU5BUllfQVBJX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/cloudinary.js\n");

/***/ }),

/***/ "(rsc)/./lib/mongoose.js":
/*!*************************!*\
  !*** ./lib/mongoose.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define MONGODB_URI in .env.local\");\n}\n// Cached connection for Next.js hot reload\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) return cached.conn;\n    if (!cached.promise) {\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            bufferCommands: false\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29vc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStCO0FBRS9CLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUUzQyxJQUFJLENBQUNBLGFBQWE7SUFDaEIsTUFBTSxJQUFJRyxNQUFNO0FBQ2xCO0FBRUEsMkNBQTJDO0FBQzNDLElBQUlDLFNBQVNDLE9BQU9OLFFBQVE7QUFFNUIsSUFBSSxDQUFDSyxRQUFRO0lBQ1hBLFNBQVNDLE9BQU9OLFFBQVEsR0FBRztRQUFFTyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUN6RDtBQUVBLGVBQWVDO0lBQ2IsSUFBSUosT0FBT0UsSUFBSSxFQUFFLE9BQU9GLE9BQU9FLElBQUk7SUFFbkMsSUFBSSxDQUFDRixPQUFPRyxPQUFPLEVBQUU7UUFDbkJILE9BQU9HLE9BQU8sR0FBR1IsdURBQWdCLENBQUNDLGFBQWE7WUFDN0NVLGdCQUFnQjtRQUNsQjtJQUNGO0lBRUEsSUFBSTtRQUNGTixPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9JLEdBQUc7UUFDVlAsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1JO0lBQ1I7SUFFQSxPQUFPUCxPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXh0bWUvLi9saWIvbW9uZ29vc2UuanM/MTYzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnXG5cbmNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUklcblxuaWYgKCFNT05HT0RCX1VSSSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgTU9OR09EQl9VUkkgaW4gLmVudi5sb2NhbCcpXG59XG5cbi8vIENhY2hlZCBjb25uZWN0aW9uIGZvciBOZXh0LmpzIGhvdCByZWxvYWRcbmxldCBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2VcblxuaWYgKCFjYWNoZWQpIHtcbiAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZGJDb25uZWN0KCkge1xuICBpZiAoY2FjaGVkLmNvbm4pIHJldHVybiBjYWNoZWQuY29ublxuXG4gIGlmICghY2FjaGVkLnByb21pc2UpIHtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICB9KVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG51bGxcbiAgICB0aHJvdyBlXG4gIH1cblxuICByZXR1cm4gY2FjaGVkLmNvbm5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGJDb25uZWN0XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiZGJDb25uZWN0IiwiY29ubmVjdCIsImJ1ZmZlckNvbW1hbmRzIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongoose.js\n");

/***/ }),

/***/ "(rsc)/./models/User.js":
/*!************************!*\
  !*** ./models/User.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: [\n            true,\n            \"Name is required\"\n        ],\n        trim: true,\n        minlength: [\n            2,\n            \"Name must be at least 2 characters\"\n        ],\n        maxlength: [\n            50,\n            \"Name cannot exceed 50 characters\"\n        ]\n    },\n    email: {\n        type: String,\n        required: [\n            true,\n            \"Email is required\"\n        ],\n        unique: true,\n        lowercase: true,\n        trim: true,\n        match: [\n            /^\\S+@\\S+\\.\\S+$/,\n            \"Please provide a valid email\"\n        ]\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Password is required\"\n        ],\n        minlength: [\n            6,\n            \"Password must be at least 6 characters\"\n        ],\n        select: false\n    },\n    avatar: {\n        type: String,\n        default: null\n    },\n    bio: {\n        type: String,\n        maxlength: [\n            160,\n            \"Bio cannot exceed 160 characters\"\n        ],\n        default: \"\"\n    },\n    status: {\n        type: String,\n        enum: [\n            \"online\",\n            \"offline\",\n            \"away\"\n        ],\n        default: \"offline\"\n    },\n    lastSeen: {\n        type: Date,\n        default: Date.now\n    },\n    conversations: [\n        {\n            type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n            ref: \"Conversation\"\n        }\n    ]\n}, {\n    timestamps: true\n});\n// Prevent model recompilation in Next.js dev mode\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUNwQztJQUNFRyxNQUFNO1FBQ0pDLE1BQU1DO1FBQ05DLFVBQVU7WUFBQztZQUFNO1NBQW1CO1FBQ3BDQyxNQUFNO1FBQ05DLFdBQVc7WUFBQztZQUFHO1NBQXFDO1FBQ3BEQyxXQUFXO1lBQUM7WUFBSTtTQUFtQztJQUNyRDtJQUNBQyxPQUFPO1FBQ0xOLE1BQU1DO1FBQ05DLFVBQVU7WUFBQztZQUFNO1NBQW9CO1FBQ3JDSyxRQUFRO1FBQ1JDLFdBQVc7UUFDWEwsTUFBTTtRQUNOTSxPQUFPO1lBQUM7WUFBa0I7U0FBK0I7SUFDM0Q7SUFDQUMsVUFBVTtRQUNSVixNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUF1QjtRQUN4Q0UsV0FBVztZQUFDO1lBQUc7U0FBeUM7UUFDeERPLFFBQVE7SUFDVjtJQUNBQyxRQUFRO1FBQ05aLE1BQU1DO1FBQ05ZLFNBQVM7SUFDWDtJQUNBQyxLQUFLO1FBQ0hkLE1BQU1DO1FBQ05JLFdBQVc7WUFBQztZQUFLO1NBQW1DO1FBQ3BEUSxTQUFTO0lBQ1g7SUFDQUUsUUFBUTtRQUNOZixNQUFNQztRQUNOZSxNQUFNO1lBQUM7WUFBVTtZQUFXO1NBQU87UUFDbkNILFNBQVM7SUFDWDtJQUNBSSxVQUFVO1FBQ1JqQixNQUFNa0I7UUFDTkwsU0FBU0ssS0FBS0MsR0FBRztJQUNuQjtJQUNBQyxlQUFlO1FBQ2I7WUFDRXBCLE1BQU1KLHdEQUFlLENBQUN5QixLQUFLLENBQUNDLFFBQVE7WUFDcENDLEtBQUs7UUFDUDtLQUNEO0FBQ0gsR0FDQTtJQUNFQyxZQUFZO0FBQ2Q7QUFHRixrREFBa0Q7QUFDbEQsaUVBQWU1Qix3REFBZSxDQUFDOEIsSUFBSSxJQUFJOUIscURBQWMsQ0FBQyxRQUFRQyxXQUFXQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGV4dG1lLy4vbW9kZWxzL1VzZXIuanM/NzM2NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnXG5cbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxuICB7XG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnTmFtZSBpcyByZXF1aXJlZCddLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIG1pbmxlbmd0aDogWzIsICdOYW1lIG11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzJ10sXG4gICAgICBtYXhsZW5ndGg6IFs1MCwgJ05hbWUgY2Fubm90IGV4Y2VlZCA1MCBjaGFyYWN0ZXJzJ10sXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnRW1haWwgaXMgcmVxdWlyZWQnXSxcbiAgICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBtYXRjaDogWy9eXFxTK0BcXFMrXFwuXFxTKyQvLCAnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBlbWFpbCddLFxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1Bhc3N3b3JkIGlzIHJlcXVpcmVkJ10sXG4gICAgICBtaW5sZW5ndGg6IFs2LCAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMnXSxcbiAgICAgIHNlbGVjdDogZmFsc2UsIC8vIERvbid0IHJldHVybiBwYXNzd29yZCBieSBkZWZhdWx0XG4gICAgfSxcbiAgICBhdmF0YXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgICBiaW86IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIG1heGxlbmd0aDogWzE2MCwgJ0JpbyBjYW5ub3QgZXhjZWVkIDE2MCBjaGFyYWN0ZXJzJ10sXG4gICAgICBkZWZhdWx0OiAnJyxcbiAgICB9LFxuICAgIHN0YXR1czoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZW51bTogWydvbmxpbmUnLCAnb2ZmbGluZScsICdhd2F5J10sXG4gICAgICBkZWZhdWx0OiAnb2ZmbGluZScsXG4gICAgfSxcbiAgICBsYXN0U2Vlbjoge1xuICAgICAgdHlwZTogRGF0ZSxcbiAgICAgIGRlZmF1bHQ6IERhdGUubm93LFxuICAgIH0sXG4gICAgY29udmVyc2F0aW9uczogW1xuICAgICAge1xuICAgICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgICAgIHJlZjogJ0NvbnZlcnNhdGlvbicsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0aW1lc3RhbXBzOiB0cnVlLCAvLyBBZGRzIGNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0XG4gIH1cbilcblxuLy8gUHJldmVudCBtb2RlbCByZWNvbXBpbGF0aW9uIGluIE5leHQuanMgZGV2IG1vZGVcbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSlcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlVzZXJTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsIm1pbmxlbmd0aCIsIm1heGxlbmd0aCIsImVtYWlsIiwidW5pcXVlIiwibG93ZXJjYXNlIiwibWF0Y2giLCJwYXNzd29yZCIsInNlbGVjdCIsImF2YXRhciIsImRlZmF1bHQiLCJiaW8iLCJzdGF0dXMiLCJlbnVtIiwibGFzdFNlZW4iLCJEYXRlIiwibm93IiwiY29udmVyc2F0aW9ucyIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJ0aW1lc3RhbXBzIiwibW9kZWxzIiwiVXNlciIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/lodash","vendor-chunks/cloudinary"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.js&appDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();