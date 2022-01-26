import {connect} from "react-redux";
import {Accordion, Tab, Tabs} from "react-bootstrap";

function Home({user}) {

    return (
        <Tabs transition={true} id="homeTabs" className="mb-3">
            <Tab eventKey="userInfo" title="User Info">
                <h1>{user.firstName}'s Info</h1>
            </Tab>
            <Tab eventKey="renovations" title="Your Renovation Plans">
                {user.planList.length === 0 ? "Looks like you haven't started any renovation plans yet. What are you waiting for, go start one!"
                :
                    <Accordion>
                        {user.planList.map((plan, idx) =>
                            <Accordion.Item eventKey={idx}>
                                <Accordion.Header>{plan.planName}</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                    est laborum.
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