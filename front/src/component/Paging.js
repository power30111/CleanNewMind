import React, {useState} from 'react'
import ReactPaginate from 'react-js-pagination';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';




const Paging = ({ handlePageChange, totalElements }) => {
    return (
        <div>
            <ReactPaginate
            itemsCountPerPage={10} /* 한 페이지에 보여줄 리스트 갯수 */
            totalItemsCount={totalElements} /* 총 리스트 */
            pageRangeDisplayed={5} /* 보여줄 페이지 갯수 */
            prevPageText={'‹'}
            nextPageText={'›'}
            onChange={handlePageChange}
            />
        </div>
    );
};

export default Paging;