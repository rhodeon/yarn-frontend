import React, {useEffect} from 'react'
import * as FeatherIcon from 'react-feather'
import 'react-perfect-scrollbar/dist/css/styles.css'
import {connect} from "react-redux"
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddFriendsModal from "../../Modals/AddFriendModal"
import FriendsDropdown from "./FriendsDropdown"
import PageLoader from "../../../utils/PageLoader"
import Error from "../../../utils/Error"
import Avatar from "../../../utils/Avatar"
import Empty from "../../../utils/Empty"
import * as actions from "../../../Store/Actions/friendAction"


function Index(props) {
    useEffect(() => {
        if(!props.friends){
            props.getFriends()
        }
    },[props.friends])

    

    const mobileMenuBtn = () => document.body.classList.toggle('navigation-open');

    return (
        <div className="sidebar active">
            <header>
                <div className="d-flex align-items-center">
                    <button onClick={mobileMenuBtn} className="btn btn-outline-light mobile-navigation-button mr-3 d-xl-none d-inline">
                        <FeatherIcon.Menu/>
                    </button>
                    <span className="sidebar-title">Friends</span>
                </div>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <AddFriendsModal/>
                    </li>
                </ul>
            </header>
            <form>
                <input type="text" className="form-control" placeholder="Search friends"/>
            </form>
            <PageLoader loading={props.loading}>
                <Error error={props.error}>
                    <div className="sidebar-body">
                        <PerfectScrollbar>
                            <ul className="list-group list-group-flush">
                                {props.friends && props.friends?.length > 0 ?
                                    props.friends.map((item, i) => {
                                        return <li key={i} className="list-group-item">
                                            <Avatar source={item.avatarURL}/>
                                            <div className="users-list-body">
                                                <div>
                                                <h5>{item.firstName + " " + item.lastName}</h5>
                                                <p>{item.status}</p>
                                                </div>
                                                <div className="users-list-action">
                                                    <div className="action-toggle">
                                                        <FriendsDropdown profile={item}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                : <Empty message={
                                    <span>No friends found. Click <FeatherIcon.UserPlus/> to add friends</span>
                                }/>}
                            </ul>
                        </PerfectScrollbar>
                    </div>
                </Error>
            </PageLoader>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      friends : state.friends.friends,
      loading: state.friends.loading,
      error: state.friends.error
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      getFriends:() => dispatch(actions.getFriends()),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Index)
