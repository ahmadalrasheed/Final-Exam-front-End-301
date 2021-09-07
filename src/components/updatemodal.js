import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class ShowUpdateForm extends Component {
    render() {
        return (
            <>
                <Modal show={this.props.ShowUpdateModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Item Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.UpdateItem}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter new title" name='Title'/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Image path</Form.Label>
                                <Form.Control type="text" placeholder="Enter new image path" name='Image' />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.props.handleClose()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default withAuth0(ShowUpdateForm);
