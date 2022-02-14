import React, {useEffect} from 'react'
import {useDispatch, useSelector, connect} from 'react-redux'
import Tour from 'reactour'
import SidebarIndex from "./Sidebars/index"
import Navigation from "./Navigation"
import Profile from "./Sidebars/Profile"
import Chat from "./Partials/Chat"
import {pageTourAction} from "../Store/Actions/pageTourAction"
import {profileAction} from "../Store/Actions/profileAction";

function Layout(props) {

    const {pageTour} = useSelector(state => state);
    const dispatch = useDispatch()    
    
    useEffect(() =>{
        if (!props.isAuth) {
            window.location.href = "/sign-in"
        }
    },[props.isAuth])

    useEffect(() => {
        document.querySelector('*').addEventListener('click', (e) => {
            if (document.body.classList.contains('navigation-open') && e.target.nodeName === 'BODY') {
                document.body.classList.remove('navigation-open')
            }
        });

        let getDemoParam = (window.location.search).replace('?demo=', '');

        if (getDemoParam === 'dark') {
            document.body.classList.add('dark');
        }else if (getDemoParam === 'rtl') {
            document.body.classList.add('rtl');
        }else if (getDemoParam === 'user-profile') {
            dispatch(profileAction(true));
        }else if (getDemoParam === 'dark-rtl') {
            document.body.classList.add('dark');
            document.body.classList.add('rtl');
        }
        
    }, []);

    const tourSteps = [
        {
            selector: '#Tooltip-New-Chat',
            content: 'You can create a new chat here.',
        },
        {
            selector: '#Tooltip-Add-Group',
            content: 'You can start a new group to chat with all your friends.',
        },
        {
            selector: '#Tooltip-2',
            content: 'Layout and messages you\'ve added to your favorites appear here.',
        },
        {
            selector: '#Tooltip-3',
            content: 'Layout and messages you\'ve archived appear here.',
        },
        {
            selector: '.layout .content .sidebar-group .sidebar .list-group-item:first-child',
            content: 'Select a chat to send a message.',
        },
        {
            selector: '#user-menu',
            content: 'Here you can manage your personal information and settings.',
        }
    ];
    return (
        
        <div className="layout">
            <Tour
                steps={tourSteps}
                isOpen={pageTour}
                onRequestClose={() => dispatch(pageTourAction(false))}
            />
            <div className="content">
                <Navigation/>
                <SidebarIndex/>
                <Chat/>
                <Profile/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      isAuth : state.auth.token ? true : false,
      token: state.auth.token
    }
  }
  

  
  
export default connect(mapStateToProps)(Layout)
