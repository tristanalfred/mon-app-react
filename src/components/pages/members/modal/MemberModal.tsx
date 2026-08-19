import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import * as React from 'react'
import type { ButtonProps } from '../Members'
import styles from './MemberModal.module.css'
import DefaultShiftTab from './tabs/DefaultShiftTab'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function MemberModal({ selectedMember }: ButtonProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [value, setValue] = React.useState('one')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div>
      <button className={styles.button} onClick={handleOpen}>
        Select
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Default shift" />
            <Tab value="two" label="Day shift" />
            <Tab value="three" label="Dated shift" />
          </Tabs>

          {value === 'one' && (
            <DefaultShiftTab selectedMember={selectedMember} />
          )}
          {value === 'two' && <div>Deuxième contenu</div>}
          {value === 'three' && <div>Troisième contenu</div>}
        </Box>
      </Modal>
    </div>
  )
}
