import './home.css';
import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";


function Home() {
  const [users, setUsers] = useState([]);
  const [temp, setTemp] = useState();

var z="";
var z1=0;
  useEffect(() => {
    
    fetchUsers();
  },[])
  function fetchUsers() {
    fetch("https://leaderboard-9h8r.onrender.com/api/user/v1/get-users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      });
  }

  const pointsAdded = async (z,e) => {
    e.preventDefault();
    console.log(z)
    window.sessionStorage.setItem("username",z);
    const response = await fetch("https://leaderboard-9h8r.onrender.com/api/user/v1/claim-points", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username:z
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the authh token and redirect
      //localStorage.setItem("token");
      //props.showAlert("Logged in Succesfully","success");
      //Router.push("/buy");
      alert(json.message);
    }
  };
function p(){

}
  return (
    <div>     

        

        <div className="md:px-32 py-8 w-full"> 
  <div className=" ml-[1px] "> 
  <div className="border-gray-200 shadow md:px-32 py-8 bg-blue-400 overflow-hidden w-full mt-[49px] mb-[-35px] flex justify-between items-center rounded border-b ">
      <div>
        <h1 className="text-white text-xl font-bold">3982 Today</h1>
        <p className="text-white text-lg mb-[20px] font-medium">₹2875.00</p>
      </div>
      <div>
        <h2 className="text-black font-bold text-lg font-medium @media screen and (max-width: 800px)">LeaderBoard</h2>
      </div>
    </div> 
    <table className=" w-full bg-white"> 
      
      <thead className="bg-gray-800 text-white"> 
        <tr> 
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th> 
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Rank</th> 
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Prize</th> 
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Points</th> 
        </tr> 
      </thead> 
    <tbody className="text-gray-700"> 

    {users.map((data) => {

return(

<tr onClick={(e)=>pointsAdded(data.username,e)}> 
    
       <td  className="w-1/3 text-left py-3 px-4">{data.username}</td>
        <td className="w-1/3 text-left py-3 px-4">Rank:<span className="text-lg text-green-500">{z1=z1+1}</span></td> 
        <td className="text-left py-3 px-4"><a className="text-red-500 hover:text-blue-500" href="">Prize: Rs. { Math.floor(Math.random() * 100) + 10}</a></td> 
        <td className="text-left py-3 px-4"><a className="text-blue-500 " href="">{data.Points}</a></td> 
</tr>
    
  )
})}

      
         
    </tbody> 
    </table> 
  </div> 
</div>


     
    </div>
  );
}

export default Home;
