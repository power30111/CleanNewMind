import React from 'react'

const List = (props) => {

    const {id, title, writer} =props

    return (
        <div className='flexbox list'>
            <div className='list-No'>{id}</div>
            <div className='list-title'>{title}</div>
        </div>
    )
}

export default List