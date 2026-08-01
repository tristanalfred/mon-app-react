import { useEffect, useState } from 'react'
import './App.css'
import MenuBox from './components/MenuBox'

const url = 'http://127.0.0.1:8000/schedule/members'

export interface MemberType {
  id: string
  first_name: string
  last_name: string
}

function MyApp() {
  const [members, setMembers] = useState<MemberType[]>([])

  const listItems = members.map((member) => (
    <tr key={member.id}>
      <td> {member.first_name} </td>
      <td> {member.last_name} </td>
    </tr>
  ))

  useEffect(() => {
    const fun = async () => {
      const urlResponse = await fetch(url)

      const json = await urlResponse.json()
      console.log(json)
      setMembers(json.data)
    }

    fun()
  }, [])

  return (
    <>
      <MenuBox></MenuBox>
      <h1>titre</h1>
      <table>
        <tr>
          <th>Firstname</th>
          <th>LastName</th>
        </tr>
        {listItems}
      </table>
    </>
  )
}

export default MyApp
