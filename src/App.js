import React, { useState, useRef, useEffect } from 'react'
import './App.css'

import Next from './Next'
import Previous from './Previous'
import Random from './Random'
import Circulation from './Circulation'
import CirculationOne from './CirculationOne'
import play from './icons/play.svg'
import musicList from './musicList'

// 顺序列表
const orderList = []
for (let i = 0; i < musicList.length; i++) {
  orderList.push(musicList[i][2])
}

// 获取随机播放的src
function getSrcUnordered() {
  const index = Math.floor(Math.random() * musicList.length)
  return musicList[index]
}

// 安全播放
function mPlay(musicDom) {
  const playPromise = musicDom.play()
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        musicDom.load()
        musicDom.play()
      })
      .catch((error) => {
        // Auto-play was prevented
        // Show paused UI.
      })
  }
}

function Music() {
  const musicActive = useRef()
  const [music, setMusic] = useState(musicList[0])
  const [playOrder, setPlayOrder] = useState('0')
  const [playOrderStatus, setPlayOrderStatus] = useState('顺序播放')

  const next = () => {
    let index = orderList.indexOf((parseInt(music[2]) + 1).toString())
    if (index === -1) {
      setMusic(musicList[0])
      mPlay(musicActive.current)
    } else {
      musicList.forEach((item) => {
        if (parseInt(item[2]) === parseInt(music[2]) + 1) {
          setMusic(item)
          mPlay(musicActive.current)
        }
      })
    }
  }

  const previous = () => {
    let index = orderList.indexOf((parseInt(music[2]) - 1).toString())
    if (index === -1) {
      setMusic(musicList[musicList.length - 1])
      mPlay(musicActive.current)
    } else {
      musicList.forEach((item) => {
        if (parseInt(item[2]) === parseInt(music[2]) - 1) {
          setMusic(item)
          mPlay(musicActive.current)
        }
      })
    }
  }

  const list = (item) => {
    for (let i = 0; i < musicList.length; i++) {
      if (parseInt(musicList[i][2]) === parseInt(item[2])) {
        setMusic(musicList[i])
        mPlay(musicActive.current)
      }
    }
  }

  const ended = () => {
    if (playOrder === '0') {
      console.log('顺序播放')
      let index = orderList.indexOf((parseInt(music[2]) + 1).toString())
      if (index === -1) {
        setMusic(musicList[0])
      } else {
        musicList.forEach((item) => {
          if (parseInt(item[2]) === parseInt(music[2]) + 1) {
            setMusic(item)
          }
        })
      }
    } else if (playOrder === '1') {
      console.log('随机播放')
      setMusic(getSrcUnordered())
    } else {
      console.log('单曲循环')
      mPlay(musicActive.current)
    }
  }

  const listItems = musicList.map((item) => (
    <p key={item[2]}>
      <img
        src={play}
        className="icon20"
        alt="play"
        onClick={() => {
          list(item)
        }}
      />
      <span>{item[1]}</span>
      <span className="span10" style={{ color: 'pink', fontSize: '1.4rem' }}>
        {item[2]}
      </span>
    </p>
  ))

  useEffect(() => {
    mPlay(musicActive.current)
  }, [music])

  return (
    <div>
      {/* ###### */}
      {/* 顺序、随机、循环播放 */}
      <Random
        onClick={() => {
          setPlayOrder('1')
          setPlayOrderStatus('随机播放')
          mPlay(musicActive.current)
        }}
      ></Random>

      <Circulation
        onClick={() => {
          setPlayOrder('0')
          setPlayOrderStatus('顺序播放')
          mPlay(musicActive.current)
        }}
      />
      <CirculationOne
        onClick={() => {
          setPlayOrder('2')
          setPlayOrderStatus('单曲循环')
          mPlay(musicActive.current)
        }}
      />
      {/* ###### */}
      {/* 上一首&下一首 */}
      <Previous
        onClick={() => {
          previous()
        }}
      ></Previous>
      <Next
        onClick={() => {
          next()
        }}
      ></Next>
      {/* ###### */}
      {/* 信息展示 */}
      <p>
        <span className="span20">正在播放第{music[2]}首歌</span>
        {playOrderStatus}
      </p>
      <p>{music[1]}</p>
      {/* ###### */}
      {/* 音乐 */}
      <audio
        ndzy={music[2]}
        ref={musicActive}
        src={music[0]}
        preload="auto"
        onEnded={() => {
          ended()
        }}
        controls
      ></audio>
      {/* ###### */}
      {/* 音乐列表 */}
      <div style={{ width: '600px', height: '450px', overflow: 'auto' }}>
        {listItems}
      </div>
    </div>
  )
}
// ###### App
function App() {
  return (
    <div className="App">
      <div className="Music">
        <Music></Music>
      </div>
    </div>
  )
}
export default App
