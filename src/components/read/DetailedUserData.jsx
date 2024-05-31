function DetailedUserData({ detailedUserInfo }) {
   
   
   return (
      <>
         <div className="page-detailed-title">USERS</div>
         
         <div className="page-detailed-info">
            <h3>{detailedUserInfo.email}</h3>

            <div>CATEGORY: {detailedUserInfo.category}</div>
         </div>
      </>
   );
};


export default DetailedUserData;