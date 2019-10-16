import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Index from './pages/index'
import Main from './pages/Main'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route  path="/" exact component={Index}/>
            <Route  path="/details/:id" component={Main}/>
        </BrowserRouter>
    )
}