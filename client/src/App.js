import React from 'react';
import {Switch,BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Landing from './pages/Landing'
import Posts from './pages/Blog/View_Posts'
import createPosts from './pages/Blog/Create_Posts'
import  adminLogin  from './components/adminLogin';
import AdminHome  from './pages/AdminHome';
import View_Single from './pages/Blog/View_Single';
import Footer from './components/UI/Footer';
import Navbar from './components/UI/Navbar';
import Update_Post from './pages/Blog/Update_Post'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab} from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { message } from 'antd';

library.add(fab, fas)
function App() {

  message.config({
    maxCount: 1
  })
  return (
    <BrowserRouter>
    <div className="wrapper" >
      <Navbar/>
      <Switch>
      <Route path='/admin' exact component={adminLogin}/>
        <Route path='/admin/home' exact component={AdminHome}/>
        <Route path='/' exact component={Landing} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register}/>
        <Route path='/posts' exact component={Posts}/>
        <Route path='/posts/create_post' component={createPosts}/>
        <Route path='/posts/:post_id' exact component={View_Single} />
        <Route path='/posts/update/:post_id' exact  component={Update_Post} />
      </Switch>
      <Footer/>

    </div>
    </BrowserRouter>
  );
}

export default App;
