import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'



const List = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {id, title, writer} =props

    const detailPage = (()=>{
        navigate(`/board/list/${id}`)
    })

    return (
        <div className='flexbox list' onClick={detailPage}>
            <div className='list-No'>{id}</div>
            <div className='list-title'>{title}</div>
        </div>
    )
}

export default List

