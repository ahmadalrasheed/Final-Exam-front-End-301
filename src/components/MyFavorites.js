import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ShowUpdateForm from './updatemodal'

class MyFavorites extends React.Component {

  constructor(props){
    super(props);
    this.state={
      Myfavoraties:[],
      ShowUpdateModal:false
    }
  }

  async componentDidMount(){
    let user=this.props.auth0.user.email;
    let MyFavoraties=await axios.get(`${process.env.REACT_APP_LINK_BACKEND}/myfavoraties?email=${user}`)
    await this.setState({
      Myfavoraties:MyFavoraties.data
    })
  }
  ShowUpdatedModal=()=>{
    this.setState({
      ShowUpdateModal:true
    })
  }

  handleClose=()=>{
    this.setState({
      ShowUpdateModal:false
    })
  }

  render() {
    return (
      <>

        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>

        {(this.props.addedtomyfav)?this.props.addedtomyfav.map(item => {
          return (
            <Card className="Mycards" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>

                <Button onClick={() => this.props.DeleteItem(item._id)} variant="primary">Delete</Button>
                <Button onClick={() => {
                     this.ShowUpdatedModal()
                     this.props.UpdatedId(item._id)
                } } variant="primary">Update</Button>

              </Card.Body>
            </Card>
          )
        }):this.state.Myfavoraties.map(item => {
          return (
            <Card className="Mycards" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>

                <Button onClick={() => this.props.DeleteItem(item._id)} variant="primary">Delete</Button>
                <Button onClick={() =>{
                     this.ShowUpdatedModal()
                     this.props.UpdatedId(item._id)
                } 
               
                  } variant="primary">Update</Button>

              </Card.Body>
            </Card>
          )
        })}

        {this.state.ShowUpdateModal&&<ShowUpdateForm UpdateItem={this.props.UpdateItem} handleClose={this.handleClose} ShowUpdateModal={this.state.ShowUpdateModal}/>}


      </>
    )
  }
}

export default withAuth0(MyFavorites);

