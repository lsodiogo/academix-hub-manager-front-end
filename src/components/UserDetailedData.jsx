function UserDetailedData({ detailedUserInfo, checkErrorOk }) {
   
   
   return (
      <>
         <h2>USERS</h2>
         
         {checkErrorOk ?
            <div>
               <h3>{detailedUserInfo.email}</h3>

               <p>Category: {detailedUserInfo.category}</p>
            </div>
         
         :
         
            <div>
               <p>{detailedUserInfo.error} {detailedUserInfo.message}</p>
            </div>
         }
      </>
   );
};


export default UserDetailedData;