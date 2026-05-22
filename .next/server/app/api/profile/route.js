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
exports.id = "app/api/profile/route";
exports.ids = ["app/api/profile/route"];
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

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fprofile%2Froute&page=%2Fapi%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprofile%2Froute.js&appDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fprofile%2Froute&page=%2Fapi%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprofile%2Froute.js&appDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_vikas_baboria_Downloads_textme_textme_app_api_profile_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/profile/route.js */ \"(rsc)/./app/api/profile/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/profile/route\",\n        pathname: \"/api/profile\",\n        filename: \"route\",\n        bundlePath: \"app/api/profile/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\vikas baboria\\\\Downloads\\\\textme\\\\textme\\\\app\\\\api\\\\profile\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_vikas_baboria_Downloads_textme_textme_app_api_profile_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/profile/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZwcm9maWxlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwcm9maWxlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcHJvZmlsZSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN2aWthcyUyMGJhYm9yaWElNUNEb3dubG9hZHMlNUN0ZXh0bWUlNUN0ZXh0bWUlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3Zpa2FzJTIwYmFib3JpYSU1Q0Rvd25sb2FkcyU1Q3RleHRtZSU1Q3RleHRtZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDZ0M7QUFDN0c7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXh0bWUvPzcyNTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcdmlrYXMgYmFib3JpYVxcXFxEb3dubG9hZHNcXFxcdGV4dG1lXFxcXHRleHRtZVxcXFxhcHBcXFxcYXBpXFxcXHByb2ZpbGVcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Byb2ZpbGUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wcm9maWxlXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wcm9maWxlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcdmlrYXMgYmFib3JpYVxcXFxEb3dubG9hZHNcXFxcdGV4dG1lXFxcXHRleHRtZVxcXFxhcHBcXFxcYXBpXFxcXHByb2ZpbGVcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3Byb2ZpbGUvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fprofile%2Froute&page=%2Fapi%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprofile%2Froute.js&appDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.js":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongoose */ \"(rsc)/./lib/mongoose.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.js\");\n\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                await (0,_lib_mongoose__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n                    email: credentials.email\n                }).select(\"+password\");\n                if (!user) throw new Error(\"No account found with this email\");\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                if (!isValid) throw new Error(\"Incorrect password\");\n                return {\n                    id: user._id.toString(),\n                    name: user.name,\n                    email: user.email,\n                    avatar: user.avatar\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.avatar = user.avatar;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.avatar = token.avatar;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWdDO0FBQ2lDO0FBQ3BDO0FBQ1M7QUFDTjtBQUV6QixNQUFNSyxjQUFjO0lBQ3pCQyxXQUFXO1FBQ1RMLDJFQUFtQkEsQ0FBQztZQUNsQk0sTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLE1BQU1MLHlEQUFTQTtnQkFFZixNQUFNVyxPQUFPLE1BQU1WLG9EQUFJQSxDQUFDVyxPQUFPLENBQUM7b0JBQUVOLE9BQU9ELFlBQVlDLEtBQUs7Z0JBQUMsR0FBR08sTUFBTSxDQUFDO2dCQUVyRSxJQUFJLENBQUNGLE1BQU0sTUFBTSxJQUFJRyxNQUFNO2dCQUUzQixNQUFNQyxVQUFVLE1BQU1oQix1REFBYyxDQUFDTSxZQUFZSSxRQUFRLEVBQUVFLEtBQUtGLFFBQVE7Z0JBQ3hFLElBQUksQ0FBQ00sU0FBUyxNQUFNLElBQUlELE1BQU07Z0JBRTlCLE9BQU87b0JBQ0xHLElBQUlOLEtBQUtPLEdBQUcsQ0FBQ0MsUUFBUTtvQkFDckJmLE1BQU1PLEtBQUtQLElBQUk7b0JBQ2ZFLE9BQU9LLEtBQUtMLEtBQUs7b0JBQ2pCYyxRQUFRVCxLQUFLUyxNQUFNO2dCQUNyQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVaLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSWSxNQUFNTixFQUFFLEdBQUdOLEtBQUtNLEVBQUU7Z0JBQ2xCTSxNQUFNSCxNQUFNLEdBQUdULEtBQUtTLE1BQU07WUFDNUI7WUFDQSxPQUFPRztRQUNUO1FBQ0EsTUFBTUMsU0FBUSxFQUFFQSxPQUFPLEVBQUVELEtBQUssRUFBRTtZQUM5QixJQUFJQSxPQUFPO2dCQUNUQyxRQUFRYixJQUFJLENBQUNNLEVBQUUsR0FBR00sTUFBTU4sRUFBRTtnQkFDMUJPLFFBQVFiLElBQUksQ0FBQ1MsTUFBTSxHQUFHRyxNQUFNSCxNQUFNO1lBQ3BDO1lBQ0EsT0FBT0k7UUFDVDtJQUNGO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtRQUNSQyxPQUFPO0lBQ1Q7SUFDQUgsU0FBUztRQUNQSSxVQUFVO0lBQ1o7SUFDQUMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0FBQ3JDLEVBQUM7QUFFRCxNQUFNQyxVQUFVcEMsZ0RBQVFBLENBQUNLO0FBQ2lCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGV4dG1lLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanM/ZGExYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gJ0AvbGliL21vbmdvb3NlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnQC9tb2RlbHMvVXNlcidcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6ICdDcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBhd2FpdCBkYkNvbm5lY3QoKVxuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSkuc2VsZWN0KCcrcGFzc3dvcmQnKVxuXG4gICAgICAgIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKCdObyBhY2NvdW50IGZvdW5kIHdpdGggdGhpcyBlbWFpbCcpXG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKVxuICAgICAgICBpZiAoIWlzVmFsaWQpIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IHBhc3N3b3JkJylcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBhdmF0YXI6IHVzZXIuYXZhdGFyLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWRcbiAgICAgICAgdG9rZW4uYXZhdGFyID0gdXNlci5hdmF0YXJcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZFxuICAgICAgICBzZXNzaW9uLnVzZXIuYXZhdGFyID0gdG9rZW4uYXZhdGFyXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgICBlcnJvcjogJy9sb2dpbicsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufVxuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJkYkNvbm5lY3QiLCJVc2VyIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmRPbmUiLCJzZWxlY3QiLCJFcnJvciIsImlzVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsImF2YXRhciIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzdHJhdGVneSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./app/api/profile/route.js":
/*!**********************************!*\
  !*** ./app/api/profile/route.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/api/auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.js\");\n/* harmony import */ var _lib_mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongoose */ \"(rsc)/./lib/mongoose.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.js\");\n\n\n\n\n\nasync function GET() {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n        await (0,_lib_mongoose__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n        const user = await _models_User__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findById(session.user.id).select(\"-password\");\n        if (!user) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"User not found\"\n        }, {\n            status: 404\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(user);\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PATCH(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n        await (0,_lib_mongoose__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n        const { name, bio, avatar } = await req.json();\n        const updates = {};\n        if (name?.trim()) updates.name = name.trim();\n        if (bio !== undefined) updates.bio = bio.slice(0, 160);\n        if (avatar !== undefined) updates.avatar = avatar;\n        const user = await _models_User__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findByIdAndUpdate(session.user.id, {\n            $set: updates\n        }, {\n            new: true,\n            runValidators: true\n        }).select(\"-password\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(user);\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2ZpbGUvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBMEM7QUFDRTtBQUNvQjtBQUMxQjtBQUNOO0FBRXpCLGVBQWVLO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1MLDJEQUFnQkEsQ0FBQ0MscUVBQVdBO1FBQ2xELElBQUksQ0FBQ0ksU0FBUyxPQUFPTixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtRQUNoRixNQUFNTix5REFBU0E7UUFDZixNQUFNTyxPQUFPLE1BQU1OLG9EQUFJQSxDQUFDTyxRQUFRLENBQUNMLFFBQVFJLElBQUksQ0FBQ0UsRUFBRSxFQUFFQyxNQUFNLENBQUM7UUFDekQsSUFBSSxDQUFDSCxNQUFNLE9BQU9WLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFpQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtRQUMvRSxPQUFPVCxxREFBWUEsQ0FBQ08sSUFBSSxDQUFDRztJQUMzQixFQUFFLE9BQU9JLEtBQUs7UUFDWixPQUFPZCxxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNwRTtBQUNGO0FBRU8sZUFBZU0sTUFBTUMsR0FBRztJQUM3QixJQUFJO1FBQ0YsTUFBTVYsVUFBVSxNQUFNTCwyREFBZ0JBLENBQUNDLHFFQUFXQTtRQUNsRCxJQUFJLENBQUNJLFNBQVMsT0FBT04scURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7UUFDaEYsTUFBTU4seURBQVNBO1FBQ2YsTUFBTSxFQUFFYyxJQUFJLEVBQUVDLEdBQUcsRUFBRUMsTUFBTSxFQUFFLEdBQUcsTUFBTUgsSUFBSVQsSUFBSTtRQUM1QyxNQUFNYSxVQUFVLENBQUM7UUFDakIsSUFBSUgsTUFBTUksUUFBUUQsUUFBUUgsSUFBSSxHQUFHQSxLQUFLSSxJQUFJO1FBQzFDLElBQUlILFFBQVFJLFdBQVdGLFFBQVFGLEdBQUcsR0FBR0EsSUFBSUssS0FBSyxDQUFDLEdBQUc7UUFDbEQsSUFBSUosV0FBV0csV0FBV0YsUUFBUUQsTUFBTSxHQUFHQTtRQUMzQyxNQUFNVCxPQUFPLE1BQU1OLG9EQUFJQSxDQUFDb0IsaUJBQWlCLENBQ3ZDbEIsUUFBUUksSUFBSSxDQUFDRSxFQUFFLEVBQ2Y7WUFBRWEsTUFBTUw7UUFBUSxHQUNoQjtZQUFFTSxLQUFLO1lBQU1DLGVBQWU7UUFBSyxHQUNqQ2QsTUFBTSxDQUFDO1FBQ1QsT0FBT2IscURBQVlBLENBQUNPLElBQUksQ0FBQ0c7SUFDM0IsRUFBRSxPQUFPSSxLQUFLO1FBQ1osT0FBT2QscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3RleHRtZS8uL2FwcC9hcGkvcHJvZmlsZS9yb3V0ZS5qcz8xMGE5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZSdcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSAnQC9saWIvbW9uZ29vc2UnXG5pbXBvcnQgVXNlciBmcm9tICdAL21vZGVscy9Vc2VyJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICAgIGlmICghc2Vzc2lvbikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSlcbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHNlc3Npb24udXNlci5pZCkuc2VsZWN0KCctcGFzc3dvcmQnKVxuICAgIGlmICghdXNlcikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVc2VyIG5vdCBmb3VuZCcgfSwgeyBzdGF0dXM6IDQwNCB9KVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1c2VyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1NlcnZlciBlcnJvcicgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQQVRDSChyZXEpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcbiAgICBpZiAoIXNlc3Npb24pIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pXG4gICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICBjb25zdCB7IG5hbWUsIGJpbywgYXZhdGFyIH0gPSBhd2FpdCByZXEuanNvbigpXG4gICAgY29uc3QgdXBkYXRlcyA9IHt9XG4gICAgaWYgKG5hbWU/LnRyaW0oKSkgdXBkYXRlcy5uYW1lID0gbmFtZS50cmltKClcbiAgICBpZiAoYmlvICE9PSB1bmRlZmluZWQpIHVwZGF0ZXMuYmlvID0gYmlvLnNsaWNlKDAsIDE2MClcbiAgICBpZiAoYXZhdGFyICE9PSB1bmRlZmluZWQpIHVwZGF0ZXMuYXZhdGFyID0gYXZhdGFyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWRBbmRVcGRhdGUoXG4gICAgICBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICB7ICRzZXQ6IHVwZGF0ZXMgfSxcbiAgICAgIHsgbmV3OiB0cnVlLCBydW5WYWxpZGF0b3JzOiB0cnVlIH1cbiAgICApLnNlbGVjdCgnLXBhc3N3b3JkJylcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24odXNlcilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdTZXJ2ZXIgZXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsImRiQ29ubmVjdCIsIlVzZXIiLCJHRVQiLCJzZXNzaW9uIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlciIsImZpbmRCeUlkIiwiaWQiLCJzZWxlY3QiLCJlcnIiLCJQQVRDSCIsInJlcSIsIm5hbWUiLCJiaW8iLCJhdmF0YXIiLCJ1cGRhdGVzIiwidHJpbSIsInVuZGVmaW5lZCIsInNsaWNlIiwiZmluZEJ5SWRBbmRVcGRhdGUiLCIkc2V0IiwibmV3IiwicnVuVmFsaWRhdG9ycyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/profile/route.js\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fprofile%2Froute&page=%2Fapi%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprofile%2Froute.js&appDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvikas%20baboria%5CDownloads%5Ctextme%5Ctextme&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();