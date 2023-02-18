import { Pagination, PaginationItem } from '@mui/material';
import React from 'react';
import '../App.css'
const PaginationForm = ({ postsPerPage, totalPosts, paginate,currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // <nav>
    //   <ul className='pagination'>
    //     <li className='page-item'>
    //       <a onClick={() => paginate(1)} className='page-link'>
    //         &laquo;
    //       </a>
    //     </li>
    //     {
       
    //         pageNumbers.map(number =>
    //           <li key={number} className='page-item'>
    //             <a onClick={() => paginate(number)} className='page-link' >
    //               {number}
    //             </a>
    //           </li>
    //         )
            

    //     }

    //     <li className='page-item'>
    //       <a onClick={() => paginate(pageNumbers.length)} className='page-link'>
    //         &raquo;
    //       </a>
    //     </li>
    //   </ul>
    // </nav>
    <Pagination
    color='secondary'
      count={pageNumbers.length}
      page= {currentPage}
      renderItem={(item)=> (
        <PaginationItem {...item} component="a" onClick={() => paginate(item.page)} />
      )}
    />
  );
};

export default PaginationForm;
