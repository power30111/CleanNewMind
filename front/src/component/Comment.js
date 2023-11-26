import React from 'react'

const Comment = (props) => {

    const { comment,userId } = props


    return (
        <div>
            <div className='comment flexbox'>
                <div className='comment-inputbox underline'>
                    <div>{userId}</div>
                    <div>{comment}</div>
                </div>
            </div>
        </div>
    )
}

export default Comment