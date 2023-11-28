import React from 'react'

const Comment = (props) => {

    const { comment,name } = props


    return (
        <div>
            <div className='comment flexbox'>
                <div className='comment-inputbox underline'>
                    <div>{name}</div>
                    <div>{comment}</div>
                </div>
            </div>
        </div>
    )
}

export default Comment