import {connect} from "react-redux";
import {useState} from "react";
import {login, showRegisterModal} from "../modules/user";
import {Button, Form} from "react-bootstrap";
import Register from "./Register";
import {bindActionCreators} from "redux";

function Login({login,showRegisterModal}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formStyle = {
        margin:"auto",
        width:"100%",
        padding: "25px",
        borderRadius: "5px",
        border: "thin solid lightgrey"
    }

    function handleSubmit(event){
        event.preventDefault()
        login({email, password})
    }

    return <>
        <Register/>
        <Form style={formStyle} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
            <Button variant="secondary" type="button" onClick={showRegisterModal}>
                Sign Up
            </Button>
        </Form>
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