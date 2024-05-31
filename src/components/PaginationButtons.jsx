function PaginationButtons({ handlePageChange, paginationLinks, paginationButtons, handlePerPageLimit }) {


   return (
      <>
         <div className="pagination-container">
            {paginationButtons.firstPage &&
               <div>
                  <button onClick={() => handlePageChange(paginationLinks.firstPage)}>
                     <img src="../images/first-page.svg" alt="first-page-icon"/>
                  </button>
               </div>
            }

            {paginationButtons.previousPage &&
               <div>
                  <button onClick={() => handlePageChange(paginationLinks.previousPage)}>
                     <img src="../images/previous-page.svg" alt="previous-page-icon"/>
                  </button>
               </div>
            }

            {!Object.values(paginationButtons).every(value => value === false) ?
            <div>{paginationLinks.currentPage} / {paginationLinks.totalPages}</div>
            : null}
            
            {!Object.values(paginationButtons).every(value => value === false) && paginationLinks.currentPage !== paginationLinks.totalPages ? 
               <div>
                  <select onChange={handlePerPageLimit} value={paginationLinks.limit}>
                     <option value="5">Show per page: 5</option>
                     <option value="10">Show per page: 10</option>
                     <option value="15">Show per page: 15</option>
                     <option value="20">Show per page: 20</option>
                  </select>
               </div>
            : null}

            {paginationButtons.nextPage &&
               <div>
                  <button onClick={() => handlePageChange(paginationLinks.nextPage)}>
                     <img src="../images/next-page.svg" alt="next-page-icon"/>
                  </button>
               </div>
            }

            {paginationButtons.lastPage &&
               <div>
                  <button onClick={() => handlePageChange(paginationLinks.lastPage)}>
                     <img src="../images/last-page.svg" alt="last-page-icon"/>
                  </button>
               </div>
            }
         </div>
      </>
   );
};


export default PaginationButtons;