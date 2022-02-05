import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createRenovation} from "../modules/user";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

function NewRenovation({userId, createRenovation}) {
    const navigate = useNavigate()
    function startRenovation(id, type) {
        createRenovation(id, type)
        navigate('/renovation')
    }

    function backToHome() {
        navigate('/')
    }

    return <>
        <Container>
            <h1 className='text-center'>Select a renovation style</h1>
            <hr/>
            <Row>
                <Col>
                    <Card>
                        <Card.Img style={{ height: '24rem', objectFit:'cover' }} variant="top" src="https://www.designideasguide.com/wp-content/uploads/2019/04/Apartment-Video-Game-Living-Room-Ideas.jpg" />
                        <Card.Body className='text-center'>
                            <Card.Title>Gaming Home Theater</Card.Title>
                            <Card.Text className='text-center'>
                                Your living room has been begging you all these years for an upgrade. Let's make it happen.
                            </Card.Text>
                            <Button variant="primary" onClick={() => startRenovation(userId, 'ht')}>Create Gaming Home Theater Setup</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img style={{ height: '24rem', objectFit:'cover' }} variant="top" src="https://i.imgur.com/YgTPeZA.jpeg" />
                        <Card.Body className='text-center'>
                            <Card.Title>PC Gaming</Card.Title>
                            <Card.Text>
                                Assemble your ultimate PC gaming setup dreams and bring them into reality.
                            </Card.Text>
                            <Button variant="primary" onClick={() => startRenovation(userId, 'pc')}>Create PC Gaming Setup</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img style={{ height: '24rem', objectFit:'cover' }} variant="top" src="https://www.pcgamesn.com/wp-content/uploads/2021/08/How_to_build_the_best_streaming_setup_Elgato.jpg" />
                        <Card.Body className='text-center'>
                            <Card.Title>PC Streamer</Card.Title>
                            <Card.Text>
                                Become a streamer and make people forget they even heard the names Ninja and Pokimane.
                            </Card.Text>
                            <Button variant="primary" onClick={() => startRenovation(userId, 'pcs')}>Create PC Streamer Setup</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className='text-center mt-4'>
                <Button variant='outline-secondary' onClick={backToHome}>
                    Back to Homepage
                </Button>
            </div>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        userId: state.currentUser.id
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createRenovation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRenovation)