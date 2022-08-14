import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import Tour from 'reactour';
import SidebarIndex from "./Sidebars/index";
import Navigation from "./Navigation";
import Profile from "./Sidebars/Profile";
import Chat from "./Partials/Chat";
import {pageTourAction} from "../Store/Actions/pageTourAction";
import {profileAction} from "../Store/Actions/profileAction";
import {disconnectedAction} from "../Store/Actions/disconnectedAction";

function Layout(props) {
    const {pageTour} = useSelector(state => state);
    const dispatch = useDispatch();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        document.querySelector('*').addEventListener('click', (e) => {
            if (document.body.classList.contains('navigation-open') && e.target.nodeName === 'BODY') {
                document.body.classList.remove('navigation-open');
            }
            // const setup = async() =>{
            //     console.log("creating");
            //     const conn = await new WebSocket(`ws://localhost:8282/ws?uid=${props.uid}`)
            //     console.log(conn);
            //     setConn(conn)
            // }
            // setup()
        }, [props.uid]);

        let getDemoParam = (window.location.search).replace('?demo=', '');

        if (getDemoParam === 'dark') {
            document.body.classList.add('dark');
        } else if (getDemoParam === 'rtl') {
            document.body.classList.add('rtl');
        } else if (getDemoParam === 'user-profile') {
            dispatch(profileAction(true));
        } else if (getDemoParam === 'dark-rtl') {
            document.body.classList.add('dark');
            document.body.classList.add('rtl');
        }

    }, []);

    useEffect(() => {
        if (connected && props.readyState === 0) {
            dispatch(disconnectedAction(true));
        } else if (props.readyState === 1) {
            setConnected(true);
        }
    }, [props.readyState]);

    if (!props.isAuth) {
        return window.location.href = "/sign-in";
    }

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
            {/*TODO: Uncomment modal after implementing all requests*/}
            {/*<DisconnectedModal />*/}
            <div className="content">
                <Navigation/>
                <SidebarIndex/>
                <Chat/>
                <Profile/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token ? true : false,
        token: state.auth.token,
        uid: state.auth.userID,
        readyState: state.auth.websocket?.readyState ? state.auth.websocket.readyState : 0
    };
};

export default connect(mapStateToProps)(Layout);
