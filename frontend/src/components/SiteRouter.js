import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import NewRenovation from "./NewRenovation";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Register from "./Register";
import Renovation from "./Renovation";

function SiteRouter() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/newrenovation' element={<NewRenovation/>}/>
                <Route path='/renovation' element={<Renovation/>}/>
                <Route path='/products' element={<Products/>}/>
                <Route path='/productdetails' element={<ProductDetails/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </Router>
    )
}

export default SiteRouter