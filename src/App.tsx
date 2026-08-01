import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Members from './components/pages/Members'
import MenuBox from './components/menu/MenuBox'
import Teams from './components/pages/Teams'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MenuBox />}>
          <Route path="/" element={<Teams />} />
          <Route path="/members" element={<Members />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
