import { useEffect, useState } from 'react'
import './App.css'

const url = 'http://127.0.0.1:8000/schedule/members';



function Member() {
  const [members, setMembers] = useState([])
  
  const listItems = members.map(member =>
  <li key={member.id}>
    {member.title}
  </li>
);

  useEffect(() => {
    const fun = async () => {
      const urlResponse = await fetch(url);

      urlResponse.json().then(json => {
        setMembers(json)
      })
    }

    fun();
  })

  return (
    <>
      <h1>titre</h1>
    </>
  )
}

export default MyApp
