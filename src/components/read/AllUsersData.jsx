import { Link } from "wouter";
import { useEffect, useState } from "react";

import apiService from "../../services/apiService";

import CreateUserForm from "../create/CreateUserForm";
import UpdateUserForm from "../update/UpdateUserForm";
import DeleteUserForm from "../delete/DeleteUserForm";


function AllUsersData({ allUsersInfo, userLoggedInInfo, cookieInfo, setshowPaginationButtons }) {

   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);


   const [users, setUsers] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] = useState([]);

   useEffect(function() {
      async function getAllUsersWithNoPaginationForSearchBar() {

         const getTotalUsers = await apiService.fetchData("users", "GET");
         const resultUsers = await apiService.fetchData(`users/?limit=${getTotalUsers.totalItems}&offset=0`, "GET");

         setUsers(resultUsers.results);
      };
      
      if (JSON.stringify(userLoggedInInfo) === "{}") {
         getAllUsersWithNoPaginationForSearchBar();
      };
   }, [userLoggedInInfo]);

   useEffect(function() {
      if (Object.keys(userLoggedInInfo).length === 0) {
         const results = users.filter((item) =>
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
         );
   
         setSearchResults(results);
      };
   }, [users, searchTerm, userLoggedInInfo]);

   function handleSearch(event) {
      const inputValue = event.target.value.trim();

      if (inputValue !== "") {
         setSearchTerm(inputValue);
         setshowPaginationButtons(false);
      } else {
         setSearchTerm("");
         setshowPaginationButtons(true);
      };
   };


   return (
      <>
         <div className="grid">
            <h2>USERS</h2>

            {cookieInfo.userCategory === "admin" &&
               <button onClick={() => setShowCreateDialog(true)}>
                  ADD NEW
               </button>
            }

            {Object.keys(userLoggedInInfo).length === 0 &&
               <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(event) => handleSearch(event)}
               />
            }
         </div>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>EMAIL</th>
                     <th>CATEGORY</th>
                     {(cookieInfo.userCategory === "admin" || userLoggedInInfo) &&
                        <th></th>
                     }
                  </tr>
               </thead>

               <tbody>
                  {cookieInfo.userCategory === "admin" ? (
                     
                     searchTerm ? (
                        searchResults.length === 0 ? (
                           <tr>
                              <td colSpan={4}>No results found for {searchTerm}</td>
                           </tr>
   
                        ) : (
                                             
                           searchResults.map((item) => (
                              <tr key={item.id}>
                                 <td>
                                    <Link href={"/users/" + item.id}>{item.email}</Link>
                                 </td>

                                 <td>
                                    {item.category}
                                 </td>

                                 <td>
                                    {item.email === cookieInfo.userEmail &&
                                       <button
                                          onClick={() => {
                                             setSelectedUser(item);
                                             setShowUpdateDialog(true);
                                          }}
                                       >
                                          ✏️
                                       </button>
                                    }

                                    {(item.email === cookieInfo.userEmail || item.category !== cookieInfo.userCategory) && <button
                                       onClick={() => {
                                          setSelectedUser(item);
                                          setShowDeleteDialog(true);
                                       }}
                                    >
                                       ❌
                                    </button>}
                                 </td>
                              </tr>
                           ))
                        )

                     ) : (

                        allUsersInfo.map((item) => (
                           <tr key={item.id}>
                              <td>
                                 <Link href={"/users/" + item.id}>{item.email}</Link>
                              </td>

                              <td>
                                 {item.category}
                              </td>

                              <td>
                                 {item.email === cookieInfo.userEmail &&
                                    <button
                                       onClick={() => {
                                          setSelectedUser(item);
                                          setShowUpdateDialog(true);
                                       }}
                                    >
                                       ✏️
                                    </button>
                                 }

                                 {(item.email === cookieInfo.userEmail || item.category !== cookieInfo.userCategory) && <button
                                    onClick={() => {
                                       setSelectedUser(item);
                                       setShowDeleteDialog(true);
                                    }}
                                 >
                                    ❌
                                 </button>}
                              </td>
                           </tr>
                        ))
                     )

                  ) : (
                     
                     <tr>
                        <td>
                           <Link href={"/users/" + userLoggedInInfo.id}>{userLoggedInInfo.email}</Link>
                        </td>

                        <td>
                           {userLoggedInInfo.category}
                        </td>

                        <td>
                           {userLoggedInInfo.email === cookieInfo.userEmail &&
                              <button
                                 onClick={() => {
                                    setSelectedUser(userLoggedInInfo);
                                    setShowUpdateDialog(true);
                                 }}
                              >
                                 ✏️
                              </button>
                           }
                        </td>
                     </tr>
                  )}  
               </tbody>
            </table>

            {cookieInfo.userCategory === "admin" &&
               <div>
                  <CreateUserForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <DeleteUserForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedUser={selectedUser}
                     cookieInfo={cookieInfo}
                  />
               </div>
            }

            <UpdateUserForm
               showUpdateDialog={showUpdateDialog}
               setShowUpdateDialog={setShowUpdateDialog}
               selectedUser={selectedUser}
               cookieInfo={cookieInfo}
            />
         </div>
      </>
   );
};


export default AllUsersData;