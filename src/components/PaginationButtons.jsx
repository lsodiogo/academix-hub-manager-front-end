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

            <select onChange={handlePerPageLimit}>
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="15">15</option>
               <option value="20">20</option>
            </select>
         </div>
      </>
   );
};


export default PaginationButtons;