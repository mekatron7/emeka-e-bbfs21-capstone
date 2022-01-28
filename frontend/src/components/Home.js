import {connect} from "react-redux";
import {Accordion, Button, Card, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {bindActionCreators} from "redux";
import {setCurrentRenovation} from "../modules/user";

function Home({user, setCurrentRenovation}) {
    const navigate = useNavigate();

    function viewRenovation(renovation) {
        setCurrentRenovation(renovation)
        navigate('/renovation')
    }

    return (
        <Container>
            <Tabs transition={true} id="homeTabs" className="mb-3">
                <Tab eventKey="userInfo" title="User Info">
                    <h1>{user.firstName}'s Info</h1>
                    <Button variant="outline-primary">
                        <Link to="/newrenovation">Start New Renovation</Link>
                    </Button>
                </Tab>
                <Tab eventKey="renovations" title="Your Renovation Plans">
                    {user.planList.length === 0 ? "Looks like you haven't started any renovation plans yet. What are you waiting for, go start one!"
                        :
                        <Accordion>
                            {user.planList.map((plan, idx) =>
                                <Accordion.Item eventKey={idx}>
                                    <Accordion.Header>{plan.planName}</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col xs={3}>
                                                <h4>Renovation Details:</h4>
                                                <h5>Date Created: {new Date(plan.dateCreated).toLocaleDateString()}</h5>
                                                <Button variant='outline-info' onClick={() => viewRenovation(plan)}>View Renovation</Button>
                                            </Col>
                                            <Col xs={9}>
                                                <Row style={{overflowX:'auto'}} className='d-flex flex-row flex-nowrap'>
                                                    {plan.items.map((item, idx2) =>
                                                        <Col sm={2} className='mt-4'>
                                                            <Card>
                                                                <Card.Img variant="top" src="holder.js/100px180" />
                                                                <Card.Body>
                                                                    <Card.Title>{item.itemSpotName}</Card.Title>
                                                                    <Card.Text>
                                                                        {item?.sku}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    )}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>
                    }
                </Tab>
            </Tabs>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        user: state.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setCurrentRenovation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)