import React from 'react'
import './App.css'
// 导入字体图标样式
import './assets/fonts/iconfont.css'
import './App.css'

// 这个是虚拟化长列表的样式
import 'react-virtualized/styles.css'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import CityList from './views/CityList'
import Map from './views/Map'

function App() {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/citylist" component={CityList} />
          <Route path="/map" component={Map} />
          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
