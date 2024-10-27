import { useLocation } from 'react-router-dom';
import './home.css';
import './modal.css'
import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";


function Leaderboard(props) {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [values, setValues] = useState([]);

var z="";
var z1=0;
  useEffect(() => {
    
    fetchUsers();
  },[])
  const onSubmit = () => {
    setModal(!modal);
  };

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

  const toggleModal = async (e) => {
    setModal(!modal);

    e.preventDefault();
    window.sessionStorage.setItem("username",z);
    const response = await fetch("https://leaderboard-9h8r.onrender.com/api/user/v1/your-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username:z
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      setValues(data.data);
      console.log(values);
    });

        
  };

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

    {users.map((data) => {z=data.username 

return(
  <tr> 

                    <div className='  mb-[40px]' >
                                     <button onClick={toggleModal} >

                  <td  className="w-[250px] absolute text-left  text-left py-3 px-4">{data.username}</td>
        <td className="w-[550px] left-[80px] absolute text-right py-3 px-4">Rank:<span className="text-lg right-[30px] text-green-500">{z1=z1+1}</span></td> 
        <td className="w-[450px] left-[610px] absolute text-right py-3 px-4"><a className="text-red-500 hover:text-blue-500" href="">Prize: Rs. { Math.floor(Math.random() * 100) + 10}</a></td> 
        <td className="w-[450px] left-[980px] absolute text- py-3 px-4"><a className="text-blue-500 " href="">{data.Points}</a></td> 
        </button> 
        </div>
      
        </tr> 

  )

})}
{modal && (
  <div className="modal">
            <div className="pop bg-white rounded-md shadow-md p-4 w-[605px] ml-[450px] mt-[150px]">
      <h2 className="text-xl font-bold mb-4 text-blue-500 ml-[-30px] mt-[-20px]">test's History</h2>
      <ul className="mb-2 ">
          <span className=" text-xl ">Date</span>
          <span className="ml-4  text-xl ml-[244px]">Points</span>
        </ul>
      <ul className="divide-gray-300 divide-y">
      {users.map((data) => {z=data.username 
      {
      values.map((data) => {

return(

        <li className="mb-2 py-2">
          <span className="font-bold ">Date:</span><span className="text-red-300">values.date</span>
          <span className="ml-4 font-bold ml-[165px]">Points Awarded:</span> <span className="text-green-500">{values.pointsAwarded}</span>
        </li>
)})}})}
      </ul>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
    </div>
          </div>        )}

      
         
    </tbody> 
    </table> 
  </div> 
</div>


     
    </div>
  );
}

export default Leaderboard;
