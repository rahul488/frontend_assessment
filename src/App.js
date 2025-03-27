import "./styles.css";
import { useEffect, useState } from 'react'
import  Grid from './Components/Grid'


/*
*
*https://nextjs-boilerplate-five-plum-29.vercel.app/api/tasks
*https://nextjs-boilerplate-five-plum-29.vercel.app/api/users/[id]
*Display the list of users (ID, name, and email) in a table order by name/id/email.
*/
export default function App() {

  const [ users,setUSers] = useState([]);

  const fetchUserDetails=async() => {

    const res= await fetch('https://nextjs-boilerplate-five-plum-29.vercel.app/api/tasks');
    const data = await res.json();
    const taskCompletedUsers = data.filter((task) => task.completed);
    const userPromise = taskCompletedUsers.map((user) => getUsers(user.id));
    Promise.allSettled(userPromise).then((results) => {
    const usersData = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value.json();
      } else {
        console.error("Error fetching user:", result.reason);
        return null;
      }
    });
    Promise.all(usersData).then((finalData) => {
      const finalUsers = finalData.filter((data) => data != null).sort((x,y) => x.id -y.id);
      console.log(finalUsers)
      setUSers(finalUsers);
    });
});
}

  const getUsers=(id) => {
    return fetch(`https://nextjs-boilerplate-five-plum-29.vercel.app/api/users/${id}`)
  }


useEffect(() => {
  fetchUserDetails();
},[])


  return (
    <div>
      <Grid headers={["Id","Name","Email"]} rows={users} />
    </div>
  );
}
