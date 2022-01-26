import {connect} from "react-redux";
import {Accordion, Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";

function Home({user}) {

    return (
        <Tabs transition={true} id="homeTabs" className="mb-3">
            <Tab eventKey="userInfo" title="User Info">
                <h1>{user.firstName}'s Info</h1>
                <Button variant="outline-primary" size="sm">
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
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>
                }
            </Tab>
        </Tabs>
    )
}

function mapStateToProps(state) {
    return {
        user: state.currentUser
    }
}

export default connect(mapStateToProps)(Home)