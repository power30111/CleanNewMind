import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import List from '../component/List';
import Paging from '../component/Paging';


const Home = () => {

    const [page,setpage] = useState(1);
    const data = useSelector((state) => state.data)
    const paging = useSelector((state) => state.paging)
    const searchValue = useSelector((state) => state.searchValue)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goWrite = () =>{
        navigate('/Write')
    }

    /*페이징*/

    // 페이징 처리 함수
    const handlePageChange = (selectedPage) => {
        setpage(selectedPage);
    };

    /*검색창 */

    //검색 선택박스
    const [selectedValue, setSelectedValue] = useState("boardName"); // 선택한 값을 상태로 관리

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // 선택한 값을 업데이트
    };

    //검색어
    const handleInputChange = (e) => {
        const { value } = e.target
        dispatch({type:'searchValue',payload:value})
    };


    
    // 검색 및 페이징 정보를 이용하여 데이터를 가져오는 함수
    const fetchData = (searchquery) => {
    
        axios.get(`http://localhost:8080/board/list/Page?page=${page}&${searchquery}`)
        .then((response) => {
            dispatch({ type: 'boardlist', payload: response.data.content });
            dispatch({ type: 'paging', payload: response.data.number });
        })
        .catch((error) => {
            console.error('요청 실패: ', error);
        });
    };
    // 게시글 조회 및 검색어 변경 시 fetchData 호출
    useEffect(() => {
        fetchData();
    }, [page]);


      // 검색 버튼 클릭 시
    const handleSearch = () => {
        setpage(1); // 검색 시 페이지를 1로 초기화

        // 검색 버튼을 클릭했을 때에만 쿼리를 업데이트
        let searchType = "boardName"; // 기본값
        let encodedSearchValue = encodeURIComponent(searchValue);
    
        let searchquery = `${selectedValue}=${encodedSearchValue}`;
    
        if (selectedValue === "boardName") {
            searchType = "boardName";
        } else if (selectedValue === "writerName") {
            searchType = "writerName";
        } else if (selectedValue === "제작") {
            encodedSearchValue = encodeURIComponent(searchValue);
            searchquery = `boardName=${encodedSearchValue}&writerName=${encodedSearchValue}`;
        }

        fetchData(searchquery);
    };



    return (
        <Container>
            <div className='hometop'>
                <h1 className='hometop-text'>게시글</h1>
            </div>

            <div className='listbox'>
                <div className='boardlist'>
                    <div className='listtop-title'>
                        <div className='list-No'>No</div>

                        <div className='list-title'>제목</div>

                        <div className='list-writer'>작성자</div>
                    </div>

                    <div className='max'>
                        {data && data.map((item, index) => (
                            <List key={item.id} {...item} index={index}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className='homebot'>

                <div className='homebot-write'>
                    <div className='flexbox'>
                        <button className="btn-hover color-9" onClick={goWrite}>글쓰기</button>
                    </div>
                </div>

                <div className='flexbox'>
                    <div className='homebot-search'>
                        <Form.Select className='homebot-select' onChange={handleSelectChange} value={selectedValue}>
                            <option value="boardName">제목</option>
                            <option value="writerName">작성자</option>
                            <option value="제작">제목 + 작성자</option>
                        </Form.Select>
                        <input  name="search" placeholder='검색창' onChange={handleInputChange}/>
                        <button className="search-btn color-9" onClick={handleSearch}>검색</button>
                    </div>
                </div>
                
                <Paging onPageChange={handlePageChange} totalElements={paging.totalElements}/>
            </div>
        </Container>
        
    )
}

export default Home
