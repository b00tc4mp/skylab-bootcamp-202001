import React, {useReducer} from 'react'
import { Timer } from '.'

const initialState = {count: 14}

function reducer(state, action) {
  const {count} = state
  const {fontSize} = action

  switch (action.type) {
    case 'increment':
      if(count < 100) return {count: count + 1}
      return {count}
    case 'decrement':
      if(count > 10) return {count: count - 1}
      return {count}
    case 'select':
      return {count: Number(fontSize)}
    default:
      throw new Error('reducer wrong')
  }

}

export default function FontSize(props) {
  const [size, dispatch] = useReducer(reducer, initialState)

  function paintSelect() {
    const options = []

    for (let index = 10; index <= 200; index++) {
      if (size.count === index) {
        options.push(<option key={index} defaultValue value={index}>{index}px</option>)
      } else {
        options.push(<option key={index} value={index}>{index}px</option>)
      }
    }

    return options
  }

  return (
    <div>
      <Timer size={size.count} />
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <select onChange={(e) => dispatch({type: 'select', fontSize: e.target.value})}>
        <option value="" >Select fontSize</option>
        {paintSelect()}
      </select>
    </div>
  )
}
