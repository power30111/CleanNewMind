import React, {useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = ({ width=280, children }) => {

    const isLogin = useSelector((state=> state.isLogin))
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(width);
    const side = useRef();

    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition > 0) {
        setX(0);
        setOpen(true);
        } else {
        setX(width);
        setOpen(false);
        }
    };

    // 사이드바 외부 클릭시 닫히는 함수
    const handleClose = async e => {
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
        await setX(width); 
        await setOpen(false);
        }
    }

    //외부 클릭 헨들러 
    useEffect(()=> {
        window.addEventListener('click', handleClose);
        return () => {
        window.removeEventListener('click', handleClose);
        };
    })


    return (
        <div className='sidebar-container'>
        <div ref={side}  className='sidebar' style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
            <button onClick={() => toggleMenu()}
            className='sidebar-button' >
                {isOpen ? 
                <span>X</span> : <FontAwesomeIcon icon={faBars} className="sidebar-openBtn" style={{color: "#4b67d8",}}/>
                }
            </button>
            
            <div className='sidebar-content'>{children}</div>
        </div>
        </div>
    );
};


export default Sidebar;