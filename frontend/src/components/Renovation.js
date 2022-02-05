import {connect} from "react-redux";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {getUser, setSpotName} from "../modules/user";
import {useNavigate} from "react-router";

function Renovation({currentRenovation, id, setSpotName, getUser}) {
    const navigate = useNavigate()

    function backToHome() {
        getUser(id)
        navigate('/')
    }

    return <>
        <Container>
            <h1 className='text-center'>{currentRenovation?.planName}</h1>
            <hr/>
            <Row>
                {currentRenovation?.items.map((item, idx) =>
                    <Col sm={4} className='mt-4'>
                        <Card>
                            <Card.Img style={{maxHeight:'100px', objectFit:'contain'}} variant="top" src={item.image} />
                            <Card.Body className='text-center'>
                                <Card.Title className='text-center'>{item.itemSpotName}</Card.Title>
                                <Card.Text>{item.name}</Card.Text>
                                <Card.Text className='text-center'>{item.salePrice > 0 && '$' + item.salePrice} {item.dollarSavings > 0 && <Badge bg='danger'>Save ${item.dollarSavings}</Badge> }</Card.Text>
                                <Button variant="outline-primary" onClick={() => setSpotName(item.itemSpotName)}>
                                    <Link to="/products">View Products</Link>
                                </Button>
                                {item.sku !== null &&
                                    <Button className='ms-3' variant='outline-info' href={item.url} target='_blank'>View Product Details</Button>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            <div className='text-center mt-4'>
                <Button variant='light' onClick={backToHome}>
                    Back to Homepage
                </Button>
            </div>
        </Container>

    </>
}

function mapStateToProps(state) {
    return {
        currentRenovation: state.currentRenovation,
        id: state.currentUser.id
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setSpotName, getUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Renovation)