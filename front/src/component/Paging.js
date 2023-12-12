// Paging 컴포넌트 변경
import React from 'react';
import ReactPaginate from 'react-js-pagination';

const Paging = ({ onPageChange, totalElements, page }) => {
    return (
        <div>
            <ReactPaginate
                itemsCountPerPage={10} /* 한 페이지에 보여줄 리스트 갯수 */
                totalItemsCount={totalElements} /* 총 리스트 */
                pageRangeDisplayed={5} /* 보여줄 페이지 갯수 */
                prevPageText={'‹'}
                nextPageText={'›'}
                onChange={onPageChange}
                activePage={page} // 활성화된 페이지 번호
                activeClassName={'active'} // 활성화된 페이지에 적용할 클래스
            />
        </div>
    );
};

export default Paging;