import React from 'react'
import ReactDOM from 'react-dom'
import SamuraiJS from './App'

it('render without crashers',()=>{
    const div = document.createElement('div')
    ReactDOM.render(<SamuraiJS/>, div)
    ReactDOM.unmountComponentAtNode(div)
})