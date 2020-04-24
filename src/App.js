import React, { useState, useRef, useEffect } from 'react'
import './App.css'
const musicList = [
  ['music/01.flac', '少年 - 梦然', '1'],
  ['music/02.flac', 'Yesterday Once More - Carpenters', '2'],
  ['music/03.flac', '出山 - 花粥&王胜娚', '3'],
]
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
  const onEnded = (e) => {
    // 当音轨播放完毕时触发
    // 播放结束
    // console.log('播放结束-----------')
    if (playOrder === '0') {
      // console.log('顺序播放')
      let index = orderList.indexOf((parseInt(music[2]) + 1).toString())
      if (index === -1) {
        setMusic(musicList[0])
        mPlay(musicActive.current)
      } else {
        musicList.map((item) => {
          if (parseInt(item[2]) === parseInt(music[2]) + 1) {
            setMusic(item)
            mPlay(musicActive.current)
          }
        })
      }
    } else if (playOrder === '1') {
      // console.log('随机播放')
      setMusic(getSrcUnordered())
      mPlay(musicActive.current)
    } else {
      // console.log('单曲循环')
      setMusic(music)
      mPlay(musicActive.current)
    }
  }
  const listItems = musicList.map((item) => (
    <p key={item[2]}>
      <span
        onClick={() => {
          musicList.map((item1) => {
            if (parseInt(item1[2]) === parseInt(item[2])) {
              setMusic(item1)
              mPlay(musicActive.current)
            }
          })
        }}
      >
        {item[1]}
      </span>
    </p>
  ))

  useEffect(() => {
    const musicDom = musicActive.current
    musicDom.addEventListener('ended', onEnded)
    return () => {
      // console.log('解绑音乐播放完成事件')
      musicDom.removeEventListener('ended', onEnded)
    }
  }, [music, playOrder])

  return (
    <div className="Music">
      {/* ###### */}
      {/* 顺序、无序播放 */}
      <button
        onClick={() => {
          setMusic(getSrcUnordered())
          setPlayOrder('1')
          setPlayOrderStatus('随机播放')
          mPlay(musicActive.current)
        }}
      >
        随机播放
      </button>
      <button
        onClick={() => {
          setPlayOrder('0')
          setPlayOrderStatus('顺序播放')
          mPlay(musicActive.current)
        }}
      >
        顺序播放
      </button>
      <button
        onClick={() => {
          setPlayOrder('2')
          setPlayOrderStatus('单曲循环')
          mPlay(musicActive.current)
        }}
      >
        单曲循环
      </button>
      {/* ###### */}
      {/* 上一首&下一首 */}
      <button
        onClick={() => {
          let index = orderList.indexOf((parseInt(music[2]) - 1).toString())
          if (index === -1) {
            setMusic(musicList[musicList.length - 1])
            mPlay(musicActive.current)
          } else {
            musicList.map((item) => {
              if (parseInt(item[2]) === parseInt(music[2]) - 1) {
                setMusic(item)
                mPlay(musicActive.current)
              }
            })
          }
        }}
      >
        上一首
      </button>
      <button
        onClick={() => {
          let index = orderList.indexOf((parseInt(music[2]) + 1).toString())
          if (index === -1) {
            setMusic(musicList[0])
            mPlay(musicActive.current)
          } else {
            musicList.map((item) => {
              if (parseInt(item[2]) === parseInt(music[2]) + 1) {
                setMusic(item)
                mPlay(musicActive.current)
              }
            })
          }
        }}
      >
        下一首
      </button>

      {/* ###### */}
      {/* 信息展示 */}
      <p>
        {music[1]}&nbsp;&nbsp;&nbsp;&nbsp;{music[2]}&nbsp;&nbsp;&nbsp;&nbsp;
        {playOrderStatus}
      </p>
      {/* ###### */}
      {/* 音乐 */}
      <audio
        ndzy={music[2]}
        ref={musicActive}
        src={music[0]}
        preload="auto"
        controls
      ></audio>
      {/* ###### */}
      {/* 音乐列表 */}
      {listItems}
    </div>
  )
}
// ######
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
