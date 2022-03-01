import React, {useState} from 'react'
import {useDispatch, useSelector, connect} from "react-redux"
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import PerfectScrollbar from "react-perfect-scrollbar"
import {profileAction} from "../../Store/Actions/profileAction"
import {mobileProfileAction} from "../../Store/Actions/mobileProfileAction"
import Avatar from "../../utils/Avatar"
import classnames from 'classnames'

function Profile(props) {

    const dispatch = useDispatch();

    const {profileSidebar, mobileProfileSidebar} = useSelector(state => state);

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const profileActions = (e) => {
        e.preventDefault();
        dispatch(profileAction(false));
        dispatch(mobileProfileAction(false))
    };

    return (
        <>
            {props.profile ?<div className={`sidebar-group ${mobileProfileSidebar ? "mobile-open" : ""}`}>
                <div className={profileSidebar ? 'sidebar active' : 'sidebar'}>
                    <header>
                        <div className="d-flex align-items-center">
                            <span className="sidebar-title">Profile</span>
                        </div>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="#/" onClick={(e) => profileActions(e)}
                                className="btn btn-outline-light text-danger sidebar-close">
                                    <FeatherIcon.X/>
                                </a>
                            </li>
                        </ul>
                    </header>
                    <div className="sidebar-body">
                        <PerfectScrollbar>
                            <div className="pl-4 pr-4">
                                <div className="text-center">
                                   <Avatar source={props.profile.avatarURL}/>
                                    <h5 className="mb-1">{props.profile.firstName + " " + props.profile.lastName}</h5>
                                    <small className="text-muted font-italic">Last seen: Today</small>

                                    <Nav tabs className="justify-content-center mt-5">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({active: activeTab === '1'})}
                                                onClick={() => {
                                                    toggle('1');
                                                }}
                                            >
                                                About
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <p className="text-muted">{props.profile.about}</p>
                                        <div className="mt-4 mb-4">
                                            <h6>Phone</h6>
                                            <p className="text-muted">{props.profile.phone}</p>
                                        </div>
                                        <div className="mt-4 mb-4">
                                            <h6>City</h6>
                                            <p className="text-muted">{props.profile.city}</p>
                                        </div>
                                        <div className="mt-4 mb-4">
                                            <h6 className="mb-3">Settings</h6>
                                            <div className="form-group">
                                                <div className="form-item custom-control custom-switch">
                                                    <input type="checkbox" className="custom-control-input"
                                                        id="customSwitch11"/>
                                                    <label className="custom-control-label"
                                                        htmlFor="customSwitch11">Block</label>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div> : null}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      profile: state.profileSidebar.selectedProfile
    }
  }
  

  
  
export default connect(mapStateToProps)(Profile)
