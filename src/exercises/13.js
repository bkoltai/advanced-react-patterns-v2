import React from 'react'
// import hoistNonReactStatics from 'hoist-non-react-statics'
import {Switch} from '../switch'

class Rendux extends React.Component {
  render() {
    // this is your job!
    return 'todo'
  }
}

function withRendux() {
  // this is your job too!
  return () => null
}

/////////////////////////////////////////////////////////
//
// You shouldn't have to change anything below this point
//
/////////////////////////////////////////////////////////

function MyInput() {
  return (
    <Rendux.Consumer>
      {rendux => (
        <input
          defaultValue={rendux.state.on ? 'on' : 'off'}
          placeholder="Type 'off' or 'on'"
          onChange={event => {
            if (event.target.value === 'on') {
              rendux.dispatch({
                type: 'toggle',
                value: true,
              })
            } else if (event.target.value === 'off') {
              rendux.dispatch({
                type: 'toggle',
                value: false,
              })
            }
            rendux.dispatch({
              type: 'input_change',
              value: event.target.value,
            })
          }}
        />
      )}
    </Rendux.Consumer>
  )
}

function MySwitch() {
  return (
    <Rendux.Consumer>
      {rendux => (
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Switch
            on={rendux.state.on}
            onClick={() =>
              rendux.dispatch({
                type: 'toggle',
                value: !rendux.state.on,
              })
            }
          />
        </div>
      )}
    </Rendux.Consumer>
  )
}

const StatePrinter = withRendux(({rendux}) => (
  <div style={{textAlign: 'left'}}>
    state:
    <pre>{JSON.stringify(rendux.state, null, 2)}</pre>
  </div>
))

function Usage() {
  return (
    <Rendux
      initialState={{on: true}}
      reducer={(state, action) => {
        switch (action.type) {
          case 'toggle':
            return {
              ...state,
              on: action.value,
            }
          case 'input_change':
            return {
              ...state,
              inputValue: action.value,
            }
          default:
            return state
        }
      }}
    >
      {({reset}) => (
        <React.Fragment>
          <MyInput />
          <MySwitch />
          <button onClick={reset}>reset</button>
          <StatePrinter />
        </React.Fragment>
      )}
    </Rendux>
  )
}
Usage.title = 'Bonus: Rendux'

export {Rendux, Usage, Usage as default}

/* eslint
"no-unused-vars": [
  "warn",
  {
    "argsIgnorePattern": "^_.+|^ignore.+",
    "varsIgnorePattern": "^_.+|^ignore.+",
    "args": "after-used"
  }
]
 */
