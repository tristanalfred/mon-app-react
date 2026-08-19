import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import * as React from 'react'
import type { ButtonProps } from '../../Members'
import styles from './DefaultShiftTab.module.css'

const urlMembers = 'http://127.0.0.1:8000/schedule/members'
const urlShifts = 'http://127.0.0.1:8000/schedule/shifts'

type ShiftPreference = {
  name: string
  long_name: string
  note: number | null
}

const shiftsSaved: ShiftPreference[] = [
  { name: 's1', long_name: 'Morning', note: 3 },
  { name: 's2', long_name: 'Afternoon', note: 3 },
  { name: 's3', long_name: 'Night', note: 1 },
]

function ListShifts({ selectedMember }: ButtonProps) {
  const [preference, setPreference] =
    React.useState<ShiftPreference[]>(shiftsSaved)

  React.useEffect(() => {
    const fun = async () => {
      const urlMembersResponse = await fetch(
        `${urlMembers}/${selectedMember}/shifts?type=default`
      )
      const urlShiftsResponse = await fetch(urlShifts)

      const memberShiftsJson: ShiftPreference[] = (
        await urlMembersResponse.json()
      ).data
      const shiftsJson = (await urlShiftsResponse.json()).data

      const shiftsJsonComplete: ShiftPreference[] = []

      for (let i = 0; i < shiftsJson.length; i++) {
        const shiftStored = memberShiftsJson.find(
          (s) => s.name === shiftsJson[i].name
        )

        shiftsJsonComplete.push({
          name: shiftsJson[i].name,
          long_name: shiftsJson[i].long_name,
          note: shiftStored ? shiftStored.note : null,
        })
      }
      setPreference(shiftsJsonComplete)
    }

    fun()
  }, [])

  const handlePreference = (
    shiftName: string,
    newPreference: number | null
  ) => {
    if (newPreference === null) return

    setPreference((current) =>
      current.map((shift) =>
        shift.long_name === shiftName
          ? { ...shift, note: newPreference }
          : shift
      )
    )
  }

  return preference.map((shift) => (
    <tr>
      <th>{shift.long_name}</th>
      <th>
        <ToggleButtonGroup
          value={shift.note}
          exclusive
          onChange={(event, newPreference) =>
            handlePreference(shift.long_name, newPreference)
          }
          aria-label="text alignment"
        >
          <ToggleButton value={3} aria-label="left aligned">
            <SentimentVerySatisfiedIcon className={styles.icon__green} />
          </ToggleButton>
          <ToggleButton value={2} aria-label="centered">
            <SentimentSatisfiedIcon className={styles.icon__orange} />
          </ToggleButton>
          <ToggleButton value={1} aria-label="right aligned">
            <SentimentVeryDissatisfiedIcon className={styles.icon__red} />
          </ToggleButton>
        </ToggleButtonGroup>
      </th>
    </tr>
  ))
}

export default function DefaultShiftTab({ selectedMember }: ButtonProps) {
  return (
    <>
      <div>
        BONJOUR {selectedMember}
        <table>
          <thead>
            <tr>
              <th>Shift</th>
              <th>Preference</th>
            </tr>
          </thead>
          <tbody>
            <ListShifts selectedMember={selectedMember}></ListShifts>
          </tbody>
        </table>
      </div>

      <button className={styles.button}>Save</button>
    </>
  )
}
