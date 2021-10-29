import './App.css';
import React, { useState, useEffect , useCallback, useRef} from 'react';
import CircularProgressBar from './pages/CircularProgress';

const imgURL = ['https://i.pinimg.com/originals/8e/61/ff/8e61ff28302b6fef1057d1b5afb52d3f.png', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cb2f2ecd-0d78-452f-b1b3-a29cfe21cd03/d5qrlhm-726c859d-9093-4463-b7c4-1f27d60b8536.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NiMmYyZWNkLTBkNzgtNDUyZi1iMWIzLWEyOWNmZTIxY2QwM1wvZDVxcmxobS03MjZjODU5ZC05MDkzLTQ0NjMtYjdjNC0xZjI3ZDYwYjg1MzYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qOhb9WsjYDZf5lvH7rg1R1XFA-uNF-EBZVTgx_DMRyM', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cb2f2ecd-0d78-452f-b1b3-a29cfe21cd03/d5j3uco-d6ae136f-0ec6-41e3-a634-73b3df90c6c9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NiMmYyZWNkLTBkNzgtNDUyZi1iMWIzLWEyOWNmZTIxY2QwM1wvZDVqM3Vjby1kNmFlMTM2Zi0wZWM2LTQxZTMtYTYzNC03M2IzZGY5MGM2YzkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.K6sB79T-Vm2lj73V_o6iJ-Ca6xP4e9CXDQUr4gwA3aU']

let currentTimer







const App = () => {

 

  const [seconds, setSeconds] = useState()
  const [imgNum, setImgNum] = useState(0)
  const [playing, setPlaying] = useState(false)

  let myTimer = useRef();
 
  const clock = useCallback((s, action, position) => {

    
    return new Promise((resolve, reject) => {
      myTimer.current = setInterval(myClock, 1000);
      let c = s;
      currentTimer = s


      function myClock() {
        --c
        let seconds = c % 60;
        setSeconds(seconds + 1)
        if (c === -1) {
          clearInterval(myTimer.current);
          if (action === 'start') {
            setPlaying(true)
          }
          if (action === 'next') {
            setImgNum(position)
          }
          resolve()

        }
      }
    })
  },[]) 



    const start = useCallback(async () =>{
      await clock(5, 'start')
      await clock(5, 'next', 1)
      await clock(5, 'next', 2)
  
    },[clock])

  useEffect(() => {
    start()
  }, [start])







  return (
    <div className="App">
      <div>
        <CircularProgressBar size={100} sx={{ color: `${playing ? '' : 'red'}` }} value={seconds * (100 / currentTimer)} seconds={seconds} />
      </div>
      {playing ? <img className={`${imgNum}`} src={imgURL[imgNum]} alt='img'></img> : null}
    </div>
  );
}

export default App;
