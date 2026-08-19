import { useEffect, useState } from 'react'
import styles from './Members.module.css'
import MemberModal from './modal/MemberModal'

const url = 'http://127.0.0.1:8000/schedule/members'

export interface MemberType {
  id: string
  first_name: string
  last_name: string
}

interface MembersProps {
  selectedTeam?: string | null
}

export interface ButtonProps {
  selectedMember: string
}

function Members({ selectedTeam = null }: MembersProps) {
  const [members, setMembers] = useState<MemberType[]>([])

  const listItems = members.map((member) => (
    <tr key={member.id}>
      <td> {member.first_name} </td>
      <td> {member.last_name} </td>
      <td>
        {' '}
        <MemberModal selectedMember={member.id}></MemberModal>{' '}
      </td>
    </tr>
  ))

  useEffect(() => {
    const fun = async () => {
      const urlResponse = selectedTeam
        ? await fetch(url + '?team=' + selectedTeam)
        : await fetch(url)

      const json = await urlResponse.json()
      console.log(json)
      setMembers(json.data)
    }

    fun()
  }, [selectedTeam])

  return (
    <>
      <h1>Members</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>LastName</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </>
  )
}

export default Members
