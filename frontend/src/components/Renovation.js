import {connect} from "react-redux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {setSpotName} from "../modules/user";

function Renovation({currentRenovation, setSpotName}) {

    return <>
        <h1 className='text-center'>{currentRenovation?.planName}</h1>
        <hr/>
        <Row>
            {currentRenovation?.items.map((item, idx) =>
                <Col sm={4} className='mt-4'>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body className='text-center'>
                            <Card.Title>{item.itemSpotName}</Card.Title>
                            <Card.Text>
                                {item?.sku}
                            </Card.Text>
                            <Button variant="outline-primary" onClick={() => setSpotName(item.itemSpotName)}>
                                <Link to="/products">View Products</Link>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    </>
}

function mapStateToProps(state) {
    return {
        currentRenovation: state.currentRenovation
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setSpotName}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Renovation)