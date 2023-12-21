function image(takeboard) {
    return (dispatch) =>{
        
        if (takeboard.content.length > 0) {
            if (takeboard.content[0].image !=null) {
                dispatch({type:'isimage'});
            }
            else if ( takeboard.content[0].image ===null) {
                dispatch({type:'noimage'});
            }
        }
    };
}


export const ShowContent={image}