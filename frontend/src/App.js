import {Col, Container, Row} from "react-bootstrap";
import Login from "./components/Login";
import {connect} from "react-redux";
import SiteRouter from "./components/SiteRouter";

function App({currentUser}) {
  return (
      <Container fluid>
          {currentUser !== null ? <SiteRouter/>
              : <Login/>}
      </Container>
  );
}

function mapStateToProps(state) {
    console.log(state)
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(App)
