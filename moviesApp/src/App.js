import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import AccountPage from './components/AccountPage/index'
import LoginPage from './components/LoginPage/index'
import Home from './components/Home/index'
import PopularPage from './components/PopularPage/index'
import MovieDetailsPage from './components/MovieDetailsPage/index'
import SearchPage from './components/SearchPage/index'
import NotFound from './components/NotFound/index'

import ProtectedRoute from './components/ProtectedRoute/index'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />

        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={PopularPage} />
        <ProtectedRoute exact path="/search" component={SearchPage} />

        <ProtectedRoute exact path="/account" component={AccountPage} />
        <ProtectedRoute exact path="/movies/:id" component={MovieDetailsPage} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
