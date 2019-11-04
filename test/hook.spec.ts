import path from "path"
import http from "http"
import puppeteer from 'puppeteer'
import { Config } from "../src"
import start from "../src/start"

jest.setTimeout(30000)

process.env.NODE_ENV = "development"
let PORT = 3333
const ROOT = path.join(__dirname, "project")
const config: Partial<Config> = {
  root: ROOT, // 项目根目录
  port: PORT, // server 端口号
  logger: null, // 不出 log
  devtool: "", // 不出 source-map
  ReactViews: {
    beautify: false, // 不美化
    transformViews: false // 已有转换，无须再做
  },
  renderMode: 'renderToString',
  routes: "routes", // 服务端路由目录
  layout: "Layout.tsx", // 自定义 Layoutclear
  webpackLogger: false, // 关闭 webpack logger
  webpackDevMiddleware: true, // 在内存里编译
}


describe('hook', () => {
  describe('useCtrl', () => {
    // let app: express.Express
    let server: http.Server
    let browser: puppeteer.Browser

    beforeAll(() => {
      return start({ config }).then((result) => {
        // app = result.app
        server = result.server
        return puppeteer.launch()
      }).then((brws) => {
        browser = brws
      })
    })

    afterAll(() => {
      server.close()
      return browser.close()
    })
    it('it work well', async () => {
      let page = await browser.newPage()
      let url = `http://localhost:${config.port}/hook`
      await page.goto(url)
      await page.waitFor('#hook')

      let content = await page.$eval('#hook', (e) => e.innerHTML)

      expect(content).toBe('Hello World')

    })
  })
  
  describe('useModel', () => {
    it.todo('should work with type infer')
  })
  
  describe('useModelActions', () => {
    it.todo('should work with type infer')
  })
  
  describe('useModelState', () => {
    it.todo('should work with type infer')
  })
})