import React,{useState, useEffect} from 'react'
import * as FeatherIcon from 'react-feather'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import {useSelector} from "react-redux"
import {NavLink, NavItem, Nav, TabPane, TabContent} from "reactstrap"
import RequestsDropdown from "./RequestsDropdown"
import PageLoader from "../../../utils/PageLoader"
import Error from "../../../utils/Error"
import Avatar from "../../../utils/Avatar"
import axios from "../../../utils/Axios"

function Index() {

    const mobileMenuBtn = () => document.body.classList.toggle('navigation-open');
    const {auth} = useSelector(state => state);
    const [activeTab, setActiveTab] = useState('1');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sentRequests, setSentRequests] = useState(null)
    const [receivedRequests, setReceivedRequests] = useState(null)

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    useEffect(() =>{
        const fetchData = async() =>{
            if(activeTab === "1"){
                setLoading(true)
                try {
                    const response = await axios.get("users/request/sent")
                    setLoading(false)
                    setSentRequests(response.data)
                } catch (error) {
                    setLoading(false)
                    setError(error)
                }
            } else if(activeTab === "2"){
                setLoading(true)
                try {
                    const response = await axios.get("users/request/received")
                    setLoading(false)
                    setReceivedRequests(response.data)
                } catch (error) {
                    setLoading(false)
                    setError(error)
                }
            }

        }
        fetchData()
    }, [activeTab, auth.token])

    return (
        <div className="sidebar active">
            <header>
                <div className="d-flex align-items-center">
                    <button onClick={mobileMenuBtn} className="btn btn-outline-light mobile-navigation-button mr-3 d-xl-none d-inline">
                        <FeatherIcon.Menu/>
                    </button>
                    <span className="sidebar-title">Friend Requests</span>
                </div>
                <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '1'})}
                                onClick={() => {
                                    toggle('1');
                                }}
                            >
                                Sent
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '2'})}
                                onClick={() => {
                                    toggle('2');
                                }}
                            >
                                Received
                            </NavLink>
                        </NavItem>
                    </Nav>
            </header>
            <PageLoader loading={loading}>
                <Error error={error}>
                    <div className="sidebar-body">
                        <PerfectScrollbar>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <ul className="list-group list-group-flush">
                                    {sentRequests ?
                                            sentRequests.map((item, i) => {
                                                return <li key={i} className="list-group-item">
                                                    <Avatar source={item.recipient.avatarURL}/>
                                                    <div className="users-list-body">
                                                        <div>
                                                            <h5>{item.recipient.firstName + " " + item.recipient.lastName}</h5>
                                                            <p>{item.recipient.status}</p>
                                                        </div>
                                                        <div className="users-list-action">
                                                            <div className="action-toggle">
                                                                <RequestsDropdown received/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            })
                                        : null}
                                    </ul>
                                </TabPane>
                                <TabPane tabId="2">
                                    <ul className="list-group list-group-flush">
                                        {receivedRequests ?
                                            receivedRequests.map((item, i) => {
                                                return <li key={i} className="list-group-item">
                                                    <Avatar source={item.requester.avatarURL}/>
                                                    <div className="users-list-body">
                                                    <div className="users-list-action">
                                                                <div className="action-toggle">
                                                                    <RequestsDropdown/>
                                                                </div>
                                                        </div>
                                                        <div>
                                                            <h5>{item.requester.firstName + " " + item.requester.lastName}</h5>
                                                            
                                                            <p>{item.requester.status}</p>
                                                        </div>
                                                        {/* <div className="users-list-action">
                                                            <div className="action-toggle">
                                                                <RequestsDropdown/>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </li>
                                            })
                                        : null}
                                    </ul>
                                </TabPane>
                            </TabContent>
                        </PerfectScrollbar>
                    </div>
                </Error>
            </PageLoader>
        </div>
        
    )
}

export default Index
