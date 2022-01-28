import {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {addProduct, getProducts} from "../modules/user";
import {Badge, Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

function Products({item, spotName, results, getProducts, addProduct}) {
    const navigate = useNavigate()

    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        getProducts(spotName, pageNumber)
    }, [pageNumber])

    function addItem(sku) {
        addProduct({...item, sku})
        navigate('/renovation')
    }

    function getPage(e) {
        setPageNumber(e.target.value)
    }

    return <>
        <Container>
            <h2 className='text-center'>Select a product for {spotName}</h2>
            <hr/>
            <Row>
                <Col>
                    <Button variant='outline-dark' className='me-3'>
                        <Link to='/'>Back to Homepage</Link>
                    </Button>
                    <Button variant='outline-primary'>
                        <Link to='/renovation'>Back to Renovation</Link>
                    </Button>
                </Col>
                <Col>
                    Page
                    <Form.Select size='sm' style={{width: '4em'}} defaultValue={1}
                                 onChange={getPage}>
                        {Array.from(Array(results?.totalPages), (_, i) => i + 1).map((page, index) =>
                            <option key={index}
                                    value={page}>
                                {page}
                            </option>)}
                    </Form.Select>
                </Col>
            </Row>
            <hr/>
            {results?.products.map((prod, idx) =>
                <Row>
                    <Col className='text-center'>
                        <Image style={{height:'25vh', width:'100%', objectFit:'contain'}} src={prod.image}/>
                    </Col>
                    <Col>
                        <h5>{prod.name}</h5>
                        <Row>
                            <Col>
                                <h6>Model: {prod.modelNumber}</h6>
                                <h6>Color: {prod.color}</h6>
                                <h6>Rating: {prod.customerReviewAverage}</h6>
                            </Col>
                            <Col>
                                <h6>SKU: {prod.sku}</h6>
                                <h6># of reviews: {prod.customerReviewCount}</h6>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <h1>{prod.regularPrice !== prod.salePrice ? '$' + prod.salePrice : '$' + prod.regularPrice}</h1>
                        {prod.dollarSavings > 0 && <><h3><Badge bg='danger'>Save ${prod.dollarSavings}</Badge></h3> <h6>Was ${prod.regularPrice}</h6></>}
                        <Button variant='outline-primary' className='me-3' onClick={() => addItem(prod.sku)}>Add Product</Button>
                        <Button variant='outline-info' href={prod.url} target='_blank'>View Product Details</Button>
                    </Col>
                    <hr/>
                </Row>
            )}
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        item: state.currentRenovation.items.find(i => i.itemSpotName === state.spotName),
        spotName: state.spotName,
        pageNumber: state.pageNumber,
        results: state.results
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getProducts, addProduct}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Products)