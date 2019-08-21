/**
 * 获取配置
 */
import path from 'path'
import defaultConfig from'./config.defaults'
import RIMVC from '../index'

interface GetConfig {
	(options?: RIMVC.Options): RIMVC.Config
}

const getConfig: GetConfig = (options) => {
	let config = Object.assign({}, defaultConfig)

	options = options || {}

	let customConfig: Partial<RIMVC.Config> = {}
	switch (typeof options.config) {
		case 'object':
			customConfig = options.config as object
			break
		case 'string':
			let customConfigModule = require(path.resolve(options.config as string))
			customConfig = customConfigModule.default as object || customConfig
			break
	}
	Object.assign(config, customConfig)

	return config
}

export default getConfig
export { default as defaultConfig } from './config.defaults'
export { default as babel } from './babel'