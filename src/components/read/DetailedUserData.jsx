function DetailedUserData({ detailedUserInfo }) {
   
   
   return (
      <>
         <h2>USERS</h2>
         
         <div>
            <h3>{detailedUserInfo.email}</h3>

            <p>Category: {detailedUserInfo.category}</p>
         </div>
      </>
   );
};


export default DetailedUserData;