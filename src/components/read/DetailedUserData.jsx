function DetailedUserData({ detailedUserInfo }) {
   
   
   return (
      <>
         <h2>USERS</h2>
         
         <div>
            <h3>{detailedUserInfo.email}</h3>

            <div>CATEGORY: {detailedUserInfo.category}</div>
         </div>
      </>
   );
};


export default DetailedUserData;