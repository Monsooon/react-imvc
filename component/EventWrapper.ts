import React from 'react'
import GlobalContext from '../context'
import RIMVC from '../index'

const isHandler = (key: string) => /^on[A-Z]+/.test(key)

interface Props {
	as?: keyof HTMLElementTagNameMap
}

export default class EventWrapper extends React.Component<Props> {
	static contextType: React.Context<{}> = GlobalContext
	static defaultProps: Props = {
		as: 'div'
	}
	render() {
		const { children, as: tag, ...restProps } = this.props
		let props: Record<string, any> = restProps
		const { handlers } = this.context as { handlers: RIMVC.Handlers }
		for (let key in props) {
			if (isHandler(key)) {
				const handler = handlers[props[key]]
				if ('function' === typeof handler) {
					props[key] = handler
				}
			}
		}
		return React.createElement(
			tag ? tag : 'div',
			props,
			children
		)
	}
}