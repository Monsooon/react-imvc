import Babel from "./babel"
import { EntireConfig } from "../type"

let cwd = process.cwd()
let port = process.env.PORT || 3000
let NODE_ENV = process.env.NODE_ENV || "development"
let isDev = NODE_ENV === "development"

const defaultConfig: EntireConfig = {
	title: "react-imvc",
	favicon: "",
	description: "An Isomorphic-MVC Framework",
	keywords: "react mvc isomorphic server-side-rendering",
	root: cwd,
	src: "src",
	routes: "routes",
	layout: "",
	publish: "publish",
	static: "static",
	staticPath: "/static",
	staticEntry: "", // 'index.html'
	staticOptions: {},
	assetsPath: "../assets.json",
	serverBundleName: "server.bundle.js",
	output: {},
	productionOutput: {},
	port: port,

	publicPath: "",
	basename: "",
	restapi: "",
	content: "",
	context: {},
	initialState: undefined,
	appSettings: undefined,

	SSR: true,
	renderMode: "renderToNodeStream",

	devtool: isDev ? "cheap-module-eval-source-map" : "",
	webpackDevMiddleware: isDev,
	hot: false,

	bundleAnalyzer: false,
	alias: {},
	logger: isDev ? "dev" : null,
	notifier: false,
	webpackPlugins: [],
	webpackLoaders: [],
	webpackLogger: {
		chunks: false, // Makes the build much quieter
		colors: true
	},
	babel: Babel,
	cookieParser: {},
	helmet: {
		frameguard: false,
		hsts: {
			// https://helmetjs.github.io/docs/hsts/
			// 关闭默认的 Strict-Transport-Security
			maxAge: 0
		}
	},
	compression: {},
	ReactViews: {
		beautify: false, // 是否美化 html 响应内容
		transformViews: false // 默认不转换 view，已经有 babel 做处理
	},
	bodyParser: {
		json: {
			limit: "10MB"
		},
		urlencoded: {
			extended: false
		}
	},
	useServerBundle: false,
	useTypeCheck: false,
	gulp: {
		// 需要压缩到 static 目录的 css
		css: [],
		// 需要压缩到 static 目录的 html
		html: [],
		// 需要压缩到 static 目录的 js
		js: [],
		// 需要复制到 static 目录的非 html, css, js 文件
		copy: [],
		// 需要复制到 publish 目录的额外文件
		publishCopy: [],
		// 需要编译到 publish 目录的额外文件
		publishBabel: []
	},
}

export default defaultConfig
