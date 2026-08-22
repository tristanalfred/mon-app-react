import type { Shift, ShiftPreference } from '@/types'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import * as React from 'react'
import type { ButtonProps } from '../../Members'
import styles from './DefaultShiftTab.module.css'

const urlMembers = 'http://127.0.0.1:8000/schedule/members'
const urlShifts = 'http://127.0.0.1:8000/schedule/shifts'
const urlShiftPreferences = 'http://127.0.0.1:8000/schedule/shiftpreferences/'

type ShiftNoted = Shift & { note: number | null }

function ListShifts({ selectedMember }: ButtonProps) {
  const [preference, setPreference] = React.useState<ShiftNoted[]>([])

  React.useEffect(() => {
    const fun = async () => {
      const urlMembersResponse = await fetch(
        `${urlMembers}/${selectedMember}/shifts?type=default`
      )
      const urlShiftsResponse = await fetch(urlShifts)

      const memberShiftsJson: ShiftPreference[] =
        await urlMembersResponse.json()
      const shiftsJson = await urlShiftsResponse.json()

      const shiftsJsonComplete: ShiftNoted[] = []

      for (let i = 0; i < shiftsJson.length; i++) {
        const shiftStored = memberShiftsJson.find(
          (s) => s.shift === shiftsJson[i].name
        )

        shiftsJsonComplete.push({
          name: shiftsJson[i].name,
          long_name: shiftsJson[i].long_name,
          description: shiftsJson[i].description,
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
  function sendNewPreferences(preferences: ShiftNoted[]): void {
    preferences.forEach((preference) => {
      if (preference.note) {
        fetch(urlShiftPreferences, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            member: selectedMember,
            shift: preference.name,
            note: preference.note,
          }),
        })
      }
    })
  }

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

      <button className={styles.button} onClick={sendNewPreferences}>
        Save
      </button>
    </>
  )
}
