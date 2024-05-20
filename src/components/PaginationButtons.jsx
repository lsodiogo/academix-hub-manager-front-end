function PaginationButtons({ handlePageChange, paginationLinks, paginationButtons, handlePerPageLimit }) {


   return (
      <>
         <div className="grid">
            {paginationButtons.firstPage &&
               <button onClick={() => handlePageChange(paginationLinks.firstPage)}>
                  FIRST PAGE
               </button>
            }

            {paginationButtons.previousPage &&
               <button onClick={() => handlePageChange(paginationLinks.previousPage)}>
                  PREVIOUS
               </button>
            }

            {!Object.values(paginationButtons).every(value => value === false) ?
            <>{paginationLinks.currentPage} / {paginationLinks.totalPages}</>
            : null}

            {paginationButtons.nextPage &&
               <button onClick={() => handlePageChange(paginationLinks.nextPage)}>
                  NEXT
               </button>
            }

            {paginationButtons.lastPage &&
               <button onClick={() => handlePageChange(paginationLinks.lastPage)}>
                  LAST PAGE
               </button>
            }

            {!Object.values(paginationButtons).every(value => value === false) ? 
               <select onChange={handlePerPageLimit}>
                  <option value="5">Show per page: 5</option>
                  <option value="10">Show per page: 10</option>
                  <option value="15">Show per page: 15</option>
                  <option value="20">Show per page: 20</option>
               </select>
            : null}
         </div>
      </>
   );
};


export default PaginationButtons;