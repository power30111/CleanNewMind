import React, {useState} from 'react'
import ReactPaginate from 'react-js-pagination';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';




const Paging = () => {

    const [page,setpage] = useState(1);
    const handlePageChange = (selectedPage) => {
        setpage(selectedPage);

        // 서버에서 해당 페이지에 맞는 데이터 가져오기
        axios.get(`http://localhost:8080/board/list/Page?page=${selectedPage}`)
            .then((response) => {
                // 가져온 데이터를 리덕스 스토어에 업데이트
                dispatch({ type: 'boardlist', payload: response.data.content });
            })
            .catch((error) => {
                console.error('게시글 조회 실패 : ', error);
            });
    }
    const paging = useSelector((state) => state.paging)
    const dispatch = useDispatch()

    // 첫 렌더링 
    useEffect(()=>{
        axios.get('http://localhost:8080/board/list/Page')
        .then((response) => {
            const pagingInfo = {
                totalElements : response.data.totalElements , //    총 아이탬 갯수
                totalPages : response.data.totalPages, // 총 페이지 갯수
                number : response.data.number //현제 페이지 
            }
            dispatch({type:'paging', payload: pagingInfo})
            console.log(paging)
            console.log("수신",response.data)
            console.log ('리스폰', response)
        })
        .catch(error => {
            console.error('게시글 조회 실패 : ', error);
        });
    },[])




    return (
        <div>
            <ReactPaginate
                activePage={page} /* 현재 페이지 */
                itemsCountPerPage={10} /* 한 페이지에 보여줄 리스트 갯수 */
                totalItemsCount={paging.totalElements} /* 총 리스트 */
                pageRangeDisplayed={5}  /* 보여줄 페이지 갯수 */
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default Paging