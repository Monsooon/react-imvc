import React from 'react'
import GlobalContext from '../context'
import { History, Location } from '../controller/types'

type Props = {
	as?: keyof HTMLElementTagNameMap
	to?: string
	href?: string
	children?: React.ReactChild
	replace?: boolean
	back?: boolean
	forward?: boolean
	go?: number
	prefetch?: boolean
	[propName: string]: any
}

export default class Link extends React.Component<Props> {
	static contextType:React.Context<any> = GlobalContext
	static defaultProps: Props = {
		as: 'a'
	}
	componentDidMount():void {
		if (this.props.prefetch) {
			this.context.prefetch(this.props.to || this.props.href)
		}
	}
	render():React.ReactNode {
		let { basename = '' } = this.context.state as { basename: string }
		let {
			to,
			href,
			children,
			replace,
			back,
			forward,
			go,
			as: tag,
			prefetch,
			...others
		} = this.props

		if (tag === 'a') {
			let targetPath:string | null = to ? `${basename}${to}` : null
			if (!targetPath && href) {
				targetPath = href
			}
			return (
				<a {...others} href={targetPath as string} onClick={this.handleClick}>
					{children}
				</a>
			)
		}

		return React.createElement(
			tag as keyof HTMLElementTagNameMap,
			Object.assign({}, others, { onClick: this.handleClick }),
			children
		  )
	}
	handleClick = (event: React.MouseEvent<HTMLElement>):void => {
		let { onClick, replace, back, forward, go, to } = this.props
		let { history, location } = this.context as { history: History, location: Location }
		onClick && onClick(event)

		if (
			event.defaultPrevented || // onClick prevented default
			event.button !== 0 || // ignore everything but left clicks
			this.props.target || // let browser handle "target=_blank" etc.
			isModifiedEvent(event) // ignore clicks with modifier keys
		) {
			return
		}

		if (back) {
			history.goBack()
		} else if (forward) {
			history.goForward()
		} else if (go) {
			history.go(go)
		} else if (to) {
			event.preventDefault()
			if (replace === true) {
				history.replace(to)
			} else {
				history.push(to)
			}
		}
	}
}

function isModifiedEvent(event: React.MouseEvent<HTMLElement>) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}
