import React from 'react'
import './App.css'
// 导入字体图标样式
import './assets/fonts/iconfont.css'


// 这个是虚拟化长列表的样式
import 'react-virtualized/styles.css'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import CityList from './views/CityList'
import Map from './views/Map'
// 房源详细信息
import Detail from './views/Detail'
import Rent from './views/Rent'
import RentAdd from './views/Rent/Add'
import RentSearch from './views/Rent/Search'
// 授权组件
import AuthRoute from './components/AuthRoute'

function App() {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/citylist" component={CityList} />
          <Route path="/map" component={Map} />
          <Route path="/detail/:id" component={Detail} />
          {/* 权限跳转---导航路由 */}
          <AuthRoute exact path="/rent">
            <Rent />
          </AuthRoute>
          <AuthRoute path="/rent/add">
            <RentAdd />
          </AuthRoute>
          <AuthRoute path="/rent/search">
            <RentSearch />
          </AuthRoute>

          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
