import {useEffect} from "react";
import {bindActionCreators} from "redux";
import {editItem, getProducts} from "../modules/user";
import {Badge, Button, Col, Image, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {useNavigate} from "react-router";

function Products({item, spotName, pageNumber, results, getProducts, editItem}) {
    const navigate = useNavigate()
    useEffect(() => {
        getProducts(spotName, pageNumber)
    }, [])

    function addItem(sku) {
        editItem({...item, sku})
        navigate('/renovation')
    }

    return <>
        <h2 className='text-center'>Select a product for {spotName}</h2>
        <hr/>
        {results?.products.map((prod, idx) =>
            <Row>
                <Col>
                    <Image src={prod.image}/>
                </Col>
                <Col>
                    <h4>{prod.name}</h4>
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
                    <Button variant='outline-primary' onClick={() => addItem(prod.sku)}>Add Product</Button>
                </Col>
                <hr/>
            </Row>
        )}
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
    return bindActionCreators({getProducts, editItem}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Products)