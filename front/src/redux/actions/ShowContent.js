function image(takeboard) {
    return (dispatch) => {
        const hasImage = takeboard.content.some(content => content.image === '');
        
        
        if (hasImage) {
            dispatch({ type: 'noimage' });
        } else {
            dispatch({ type: 'haveimage' });
            }
        };
}

export const ShowContent={image}