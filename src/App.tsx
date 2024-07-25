import './App.css'
import Slider from './components/Slider'
import { POSITIONS } from './constants'
import { quickSort } from './utils'

function App() {

  return (
    <div className='app'>
      <div className='wrapper'>

        <Slider positions={quickSort(POSITIONS)} />
      </div>
    </div>
  )
}

export default App
