import {connect} from "react-redux";
import {useState} from "react";
import {login, showRegisterModal} from "../modules/user";
import {Button, Container, Form} from "react-bootstrap";
import Register from "./Register";
import {bindActionCreators} from "redux";

function Login({login,showRegisterModal}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formStyle = {
        width:"600px",
        padding:'25px',
        borderRadius: "5px",
        border: "thin solid lightgrey"
    }

    function handleSubmit(event){
        event.preventDefault()
        login({email, password})
    }

    return <>
        <Container>
            <Register/>
            <h1 className='text-center mt-4'>Login</h1>
            <div className='d-flex justify-content-center my-5'>
                <Form style={formStyle} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button className='me-3' variant="primary" type="submit">
                        Log In
                    </Button>
                    <Button variant="secondary" type="button" onClick={showRegisterModal}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        userReducer: state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login,showRegisterModal}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)