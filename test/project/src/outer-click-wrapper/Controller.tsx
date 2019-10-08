import React from 'react'
import { Location, Context } from '../../../../type'
import Controller from '../../../../controller'
import { OuterClickWrapper } from '../../../../component'

const initialState = {
  count: 0
}

export default class extends Controller<typeof initialState, {}, typeof View> {
	SSR = true // enable server side rendering
  View = View
  initialState = initialState
  constructor(location: Location, context: Context) {
    super(location, context)
  }

  handleClick = () => {
    this.store.actions.UPDATE_INPUT_VALUE({
      count: this.store.getState().count + 1
    })
  }
}

export interface State {
  count: number
}

export interface Ctrl {
  handleClick: Function
}

function View({ state, ctrl, actions }: { state: State, ctrl: Ctrl, actions: any }) {
	return (
    <div id="outer_click">
      <div id="out">
        <div>
          <p id="beside">beside region</p>
        </div>
        <OuterClickWrapper onClick={ctrl.handleClick}>
          <p id="inner">inner region</p>
        </OuterClickWrapper>
      </div>
      <p id="count">{state.count}</p>
    </div>
  )
}