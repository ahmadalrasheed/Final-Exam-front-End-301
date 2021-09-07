import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import RenderedDataFromApi from './rendereddata';
import axios from 'axios';

class AllDataAPI extends Component {
    constructor(props){
        super(props)
        this.state={
            apidata:[],
        }
    }

    async componentDidMount(){
        let DataFromApi=await axios.get(`${process.env.REACT_APP_LINK_BACKEND}/apidata`)
        console.log(DataFromApi.data);
        this.setState({
            apidata:DataFromApi.data
        })
        console.log(this.state.apidata);
    }


    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                {(this.state.apidata.length>0)?<RenderedDataFromApi AddToFav={this.props.AddToFav} apidata={this.state.apidata}/>:console.log('no data from api')}
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
