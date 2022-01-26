import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {register,hideRegisterModal, showRegisterModal} from "../modules/user";
import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

function Register({show, hideRegisterModal, register}) {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[fName, setFName] = useState('')
    const[lName, setLName] = useState('')

    function validateNewUser(event){
        event.preventDefault()

        let valid = true
        if(fName === '') {
            alert('Please enter a first name.')
            valid = false
        }
        if(lName === '') {
            alert('Please enter a last name.')
            valid = false
        }
        if(password === '') {
            alert('Please enter a password.')
            valid = false
        }
        else if(password !== confirmPassword) {
            alert('Both password fields need to match. Please try again.')
            valid = false
        }
        if(email === '') {
            alert('Please enter an email address.')
            valid = false
        }
        if(valid){
            register({
                email: email,
                dateCreated: new Date(),
                password: password,
                firstName: fName,
                lastName: lName
            })
        }
    }
    return <>
        <Modal show={show} onHide={hideRegisterModal}>
            <Modal.Header closeButton>
                <Modal.Title>Join the Gamer Alliance</Modal.Title>
            </Modal.Header>
            <Form onSubmit={validateNewUser}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First name" onChange={e => setFName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" onChange={e => setLName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideRegisterModal}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}

function mapStateToProps(state) {
    return {
        show: state.showRegisterModal
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({register,showRegisterModal,hideRegisterModal}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)