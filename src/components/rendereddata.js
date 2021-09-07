import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './style.css';


class RenderedDataFromApi extends Component {
    render() {
        return (
            <>
                {this.props.apidata.map(item => {
                    return (
                        <Card className="Mycards" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.imageUrl} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>

                                <Button onClick={()=>this.props.AddToFav(item)} variant="primary">Add to fav</Button>
                            </Card.Body>
                        </Card>
                    )

                })
                }
            </>
        )
    }
}

export default withAuth0(RenderedDataFromApi);
