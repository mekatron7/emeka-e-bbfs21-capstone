import {Col, Container, Row} from "react-bootstrap";
import Login from "./components/Login";
import {connect} from "react-redux";
import SiteRouter from "./components/SiteRouter";

function App({currentUser}) {
  return (
      <Container fluid>
        <Row>
          {currentUser !== null ? <Col><SiteRouter/></Col>
              : <Col xs={6}><Login/></Col>}
        </Row>
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
