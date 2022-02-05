//Actions
const LOGIN_FAILURE = 'bby-capstone/LOGIN_FAILURE'
const LOGIN_SUCCESS = 'bby-capstone/LOGIN_SUCCESS'
const LOGOUT = 'bby-capstone/LOGOUT'
const SHOW_REGISTER_MODAL = 'bby-capstone/SHOW_REGISTER_MODAL'
const HIDE_REGISTER_MODAL = 'bby-capstone/HIDE_REGISTER_MODAL'
const RETRIEVE_PRODUCTS = 'bby-capstone/RETRIEVE_PRODUCTS'
const SET_CURRENT_RENOVATION = 'bby-capstone/SET_CURRENT_RENOVATION'
const SET_SPOT_NAME = 'bby-capstone/SET_SPOT_NAME'

//Reducer
const initialState = {
    currentUser: null,
    renovations: [],
    results: null,
    renovation: null,
    showRegisterModal: false,
    errorMessage: '',
    currentRenovation: null,
    spotName: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_FAILURE:
            return {
                ...state,
                errorMessage: action.message
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.currentUser,
                errorMessage: ''
            }
        case LOGOUT:
            return {
                ...initialState
            }
        case SHOW_REGISTER_MODAL:
            return {
                ...state,
                showRegisterModal: true
            }
        case HIDE_REGISTER_MODAL:
            return {
                ...state,
                showRegisterModal: false
            }
        case RETRIEVE_PRODUCTS:
            return {
                ...state,
                results: action.results
            }
        case SET_CURRENT_RENOVATION:
            return {
                ...state,
                currentRenovation: action.renovation
            }
        case SET_SPOT_NAME:
            return {
                ...state,
                spotName: action.spotName,
                results: null
            }
        default:
            return state
    }
}

//Action Creators
export function loginFailure(message) {
    alert(message)
    return {type: LOGIN_FAILURE, message}
}

export function loginSuccess(currentUser) {
    return {type: LOGIN_SUCCESS, currentUser}
}

export function logout() {
    return {type: LOGOUT}
}

export function showRegisterModal() {
    return {type: SHOW_REGISTER_MODAL}
}

export function hideRegisterModal() {
    return {type: HIDE_REGISTER_MODAL}
}

export function setResults(results) {
    return {type: RETRIEVE_PRODUCTS, results}
}

export function setCurrentRenovation(renovation) {
    return {type: SET_CURRENT_RENOVATION, renovation}
}

export function setSpotName(spotName) {
    return {type: SET_SPOT_NAME, spotName}
}

//Side Effects
export function login(credentials) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => {
            if (!response.ok)
                return dispatch(loginFailure('Failure connecting to server.'))

            response.json().then(response => {
                if (response.message === 'success') {
                    dispatch(loginSuccess(response.user))
                }
                else dispatch(loginFailure(response.message))
            })
        }).catch(error => dispatch(loginFailure(error)))
    }
}

export function register(newUser) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (!response.ok)
                return alert('Create user failure')
            dispatch(hideRegisterModal())
        }).catch(error => alert(error))
    }
}

export function getProducts(spotName, pageNumber) {
    return function sideEffect(dispatch) {
        switch (spotName) {
            case 'TV':
                dispatch(getProductsByClass('PREMIUM FPTV', pageNumber))
                break
            case 'Home Audio':
                dispatch(getProductsBySubclass('SOUNDBARS', pageNumber))
                break
            case 'Console':
                dispatch(getProductsByClass('VIDEO GAME HARDWARE', pageNumber))
                break
            case 'TV Stand':
                dispatch(getProductsByClassAndCategory('HOME FURNITURE', 'TV Stands', pageNumber))
                break
            case 'PC':
                dispatch(getProductsByClasses(['GAMING LAPTOPS','GAMING DESKTOPS'], pageNumber))
                break
            case 'Keyboard':
                dispatch(getProductsBySubclass('GAMING KEYBOARD', pageNumber))
                break
            case 'Mouse':
                dispatch(getProductsBySubclass('GAMING MICE', pageNumber))
                break
            case 'Monitor':
                dispatch(getProductsBySubclass('GAMING MONITORS', pageNumber))
                break
            case 'Headset':
                dispatch(getProductsBySubclass('GAMING HEADSET', pageNumber))
                break
            case 'Camera':
                dispatch(getProductsByCategory('Webcams', pageNumber))
                break
            case 'Microphone':
                dispatch(getProductsBySubclassAndCategory('CC MICROPHONES', 'Condenser Microphones', pageNumber))
                break
            case 'Lighting':
                dispatch(getProductsBySubclassAndCategory('CC LIGHTING', 'LED Lighting', pageNumber))
                break
            case 'Stream Deck':
            default:
                dispatch(search(spotName, pageNumber))
        }
    }
}

export function getProductsBySku(sku) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/api/products/bySku", {
            method: "GET",
            headers: {
                'sku': sku
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve product.')
            response.json().then(result => {
                dispatch(setResults({results: result}))
            })
        }).catch(error => alert(error))
    }
}

export function getProductsByCategory(category, pageNumber) {
    return function sideEffect(dispatch) {
        const pageParam = pageNumber === undefined ? '' : `?pageNum=${pageNumber}`
        fetch(`http://localhost:8080/api/products/byCategory${pageParam}`, {
            method: "GET",
            headers: {
                'category': category
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve products.')
            response.json().then(results => {
                dispatch(setResults(results))
            })
        }).catch(error => alert(error))
    }
}

export function getProductsByClass(className, pageNumber) {
    return function sideEffect(dispatch) {
        const pageParam = pageNumber === undefined ? '' : `?pageNum=${pageNumber}`
        fetch(`http://localhost:8080/api/products/byClass${pageParam}`, {
            method: "GET",
            headers: {
                'className': className
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve products.')
            response.json().then(results => {
                dispatch(setResults(results))
            })
        }).catch(error => alert(error))
    }
}

export function getProductsBySubclass(subclass, pageNumber) {
    return function sideEffect(dispatch) {
        const pageParam = pageNumber === undefined ? '' : `?pageNum=${pageNumber}`
        fetch(`http://localhost:8080/api/products/bySubclass${pageParam}`, {
            method: "GET",
            headers: {
                'subclass': subclass
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve products.')
            response.json().then(results => {
                dispatch(setResults(results))
            })
        }).catch(error => alert(error))
    }
}

export function getProductsByClassAndCategory(className, category, pageNumber) {
    return function sideEffect(dispatch) {
        const pageParam = pageNumber === undefined ? '' : `?pageNum=${pageNumber}`
        fetch(`http://localhost:8080/api/products/byClassAndCategory${pageParam}`, {
            method: "GET",
            headers: {
                'className': className,
                'category': category
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve products.')
            response.json().then(results => {
                dispatch(setResults(results))
            })
        }).catch(error => alert(error))
    }
}

export function getProductsBySubclassAndCategory(subclass, category, pageNumber) {
    return function sideEffect(dispatch) {
        const pageParam = pageNumber === undefined ? '' : `?pageNum=${pageNumber}`
        fetch(`http://localhost:8080/api/products/bySubclassAndCategory${pageParam}`, {
            method: "GET",
            headers: {
                'subclass': subclass,
                'category': category
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve products.')
            response.json().then(results => {
                dispatch(setResults(results))
            })
        }).catch(error => alert(error))
    }
}

export function getProductsByClasses(classes, pageNumber) {
    return function sideEffect(dispatch) {
        const pageParam = pageNumber === undefined ? '' : `?pageNum=${pageNumber}`
        fetch(`http://localhost:8080/api/products/byClasses${pageParam}`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(classes)
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve products.')
            response.json().then(results => {
                dispatch(setResults(results))
            })
        }).catch(error => alert(error))
    }
}

export function search(query, pageNumber) {
    return function sideEffect(dispatch) {
        const pageParam = pageNumber === undefined ? '' : `?pageNum=${pageNumber}`
        fetch(`http://localhost:8080/api/products/search${pageParam}`, {
            method: "GET",
            headers: {
                'search': query
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve products.')
            response.json().then(results => {
                dispatch(setResults(results))
            })
        }).catch(error => alert(error))
    }
}

export function createRenovation(id, type) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/api/renovations/newRenovation", {
            method: "POST",
            headers: {
                'id': id,
                'type': type
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to connect to server.')
            response.json().then(renovation => {
                dispatch(setCurrentRenovation(renovation))
            })
        }).catch(error => alert(error))
    }
}

export function addProduct(item) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/api/renovations/addProduct", {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(item)
        }).then(response => {
            if (!response.ok)
                return alert('Failed to connect to server.')
            response.json().then(renovation => {
                dispatch(setCurrentRenovation(renovation))
            })
        }).catch(error => alert(error))
    }
}

export function getUser(id) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/api/users/getUser", {
            method: "GET",
            headers: {
                'id': id
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to retrieve user info.')
            response.json().then(user => {
                dispatch(loginSuccess(user))
            })
        }).catch(error => alert(error))
    }
}

export function deleteRenovation(id) {
    return function sideEffect(dispatch, getState) {
        fetch("http://localhost:8080/api/renovations/deleteRenovation", {
            method: "DELETE",
            headers: {
                'id': id
            }
        }).then(response => {
            if (!response.ok)
                return alert('Failed to delete renovation.')
            response.text().then(text => {
                dispatch(getUser(getState().currentUser.id))
            })
        }).catch(error => alert(error))
    }
}