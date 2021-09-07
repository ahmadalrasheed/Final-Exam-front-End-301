import React from 'react';
import Header from './Header';
import Profile from './Profile';
import Login from './Login';
import MyFavorites from './components/MyFavorites';
import AllDataAPI from './components/AllDataAPI'
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      updateditemid:''
    }
  }

  AddToFav= async(item)=>{
    item.email=this.props.auth0.user.email;
    // console.log(item);
    let AddedToFavItems=await axios.post(`${process.env.REACT_APP_LINK_BACKEND}/addedtofav`,item)
    await this.setState({
      addedtomyfav:AddedToFavItems.data
    })
    console.log(this.state.addedtomyfav);
  }

  DeleteItem=async (itemid)=>{
     console.log(itemid);
    let email=this.props.auth0.user.email;
     let MyFavAfterDeletion=await axios.delete(`${process.env.REACT_APP_LINK_BACKEND}/deleteitem/${itemid}`,{params:email})
    //  console.log(MyFavAfterDeletion.data);
     await this.setState({
      addedtomyfav:MyFavAfterDeletion.data
     })

  }

  UpdateItem=async(event)=>{
    event.preventDefault();
    let email=this.props.auth0.user.email;

    let NewItem={
      title:event.target.Title.value,
      image:event.target.Image.value,
      useremail:email,
      id:this.state.updateditemid
    }
    // console.log(NewItem);
    let UpdatedItems= await axios.put(`${process.env.REACT_APP_LINK_BACKEND}/updateitem`,NewItem)
    this.setState({
      addedtomyfav:UpdatedItems.data
    })

  }

  UpdatedId=(itemid)=>{
    this.setState({
      updateditemid:itemid
    })
  }
  render() {
    return(
      <>
        <Router>
            <Header />
            <Switch>

              <Route exact path="/">
                {this.props.auth0.isAuthenticated ? <MyFavorites UpdatedId={this.UpdatedId} UpdateItem={this.UpdateItem} DeleteItem={this.DeleteItem} addedtomyfav={this.state.addedtomyfav}/> : <Login />}
              </Route>

              <Route path="/profile">
                <Profile/>
              </Route>

              <Route path="/getAPIData">
                <AllDataAPI AddToFav={this.AddToFav}/>
              </Route>
              
            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);

