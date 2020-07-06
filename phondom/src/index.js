import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './redux/store'
import Register from 'containers/register/register'
import Login from 'containers/login/login'
import Main from 'containers/main/main'
import Bossinfor from 'components/Improveinformation/boss/bossinfor'
import Jobs from 'components/Improveinformation/jobseekers/jobs'

ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
           <Route path='/register' component={Register} />
           <Route path='/login' component={Login} />
           <Route path='/main' component={Main} />
           <Route path='/bossinfor' component={Bossinfor} />
           <Route path='/jobs' component={Jobs} />
           <Route component={Login} />
        </Switch>
      </HashRouter>
    </Provider>
     ,document.getElementById('root'))