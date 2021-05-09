import React from'react'
import All from './Elements/All'
import PostPage from './PostPage'
import FrontPage from './FrontPage'
import Login from './Elements/Login'
import Profile from './Elements/Profile'
import Register from './Elements/Register'
import SubReddit from './SubPage/SubReddit'
import Create from './Elements/Create/Create'
import { Route, Switch } from 'react-router-dom'
import CreateSubreddit from './Elements/CreateSubreddit'

function Body() {
  return (
    <Switch>
      <Route exact path="/" component={FrontPage}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/create/post" component={Create}/>
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/post/:id" component={PostPage}/>
      <Route exact path="/create/cummunity" component={CreateSubreddit}/>
      <Route exact path="/r/:sub" component={SubReddit}/>
      <Route exact path="/all" component={All}/>
    </Switch>
  );
}

export default Body;