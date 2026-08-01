import { useEffect, useState } from 'react'
import Members from './Members'
import styles from './Teams.module.css'

const url = 'http://127.0.0.1:8000/schedule/teams'

export interface TeamType {
  id: string
  name: string
}

interface ButtonProps {
  selectedTeam: string
  setSelectedTeam: (team: string) => void
}

function ButtonTeam({ selectedTeam, setSelectedTeam }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={() => setSelectedTeam(selectedTeam)}
    >
      Select
    </button>
  )
}

function Teams() {
  const [teams, setTeams] = useState<TeamType[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const listItems = teams.map((team) => (
    <tr key={team.id}>
      <td> {team.name} </td>
      <td>
        {' '}
        <ButtonTeam
          selectedTeam={team.id}
          setSelectedTeam={setSelectedTeam}
        ></ButtonTeam>{' '}
      </td>
    </tr>
  ))

  useEffect(() => {
    const fun = async () => {
      const urlResponse = await fetch(url)

      const json = await urlResponse.json()
      console.log(json)
      setTeams(json.data)
    }

    fun()
  }, [])

  return (
    <>
      <h1>Teams</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
      {selectedTeam ? <Members selectedTeam={selectedTeam} /> : null}
    </>
  )
}

export default Teams
