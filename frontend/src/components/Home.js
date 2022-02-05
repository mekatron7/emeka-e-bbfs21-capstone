import {connect} from "react-redux";
import {Accordion, Badge, Button, Card, Col, Container, Image, Row, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {bindActionCreators} from "redux";
import {logout, setCurrentRenovation} from "../modules/user";

function Home({user, setCurrentRenovation, logout}) {
    const navigate = useNavigate();

    function viewRenovation(renovation) {
        setCurrentRenovation(renovation)
        navigate('/renovation')
    }

    return (
        <Container>
            <Tabs transition={true} id="homeTabs" className="mb-3">
                <Tab eventKey="userInfo" title="User Info">
                    <h1 className='text-center'>Hey {user.firstName}, let's turn those ultimate gaming setup dreams of yours into reality.</h1>
                    <div className='text-center'>
                        <Button className='me-3' variant="outline-primary">
                            <Link to="/newrenovation">Start New Renovation</Link>
                        </Button>
                        <Button variant='outline-secondary' onClick={logout}>Logout</Button>
                    </div>
                    <Image style={{width:'1295px', objectFit:'contain'}} src='https://i.imgur.com/l3gaHJm.jpeg'/>
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
                                                <h4 className='mb-4'>Renovation Details:</h4>
                                                <h5 className='mb-4'>Date Created: {new Date(plan.dateCreated).toLocaleDateString()}</h5>
                                                {plan.items.map((item, idx3) => {
                                                    if (idx3 === 0) plan.total = 0
                                                    plan.total += item.salePrice
                                                })}
                                                <h5>Total: ${plan.total.toFixed(2)}</h5>
                                                <Button className='mt-4' variant='outline-info' onClick={() => viewRenovation(plan)}>View Renovation</Button>
                                            </Col>
                                            <Col xs={9}>
                                                <Row style={{overflowX:'auto'}} className='d-flex flex-row flex-nowrap'>
                                                    {plan.items.map((item, idx2) =>
                                                        <Col sm={4} className='mt-1'>
                                                            <Card>
                                                                <Card.Img style={{maxHeight:'100px', objectFit:'contain'}} variant="top" src={item.image} />
                                                                <Card.Body>
                                                                    <Card.Title className='text-center'>{item.itemSpotName}</Card.Title>
                                                                    <Card.Text>{item.name}</Card.Text>
                                                                    <Card.Text className='text-center'>{item.salePrice > 0 && '$' + item.salePrice} {item.dollarSavings > 0 && <Badge bg='danger'>Save ${item.dollarSavings}</Badge> }</Card.Text>
                                                                    {item.sku !== null &&
                                                                    <div className='text-center mt-4'>
                                                                        <Button variant='outline-info' href={item.url} target='_blank'>View Product Details</Button>
                                                                    </div>
                                                                    }
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
    return bindActionCreators({setCurrentRenovation, logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)