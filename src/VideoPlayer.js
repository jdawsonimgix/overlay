import React, { useRef, useState, useEffect } from 'react'
import videojs from 'video.js'
import 'videojs-contextmenu-ui'
import 'videojs-overlay'

export const VideoPlayer = (props) => {
  const videoPlayerRef = useRef(null) // Instead of ID
  const [currentTime, setCurrentTime] = useState(null)
  const videoSrc = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
  const videoJSOptions = {
    autoplay: 'muted',
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
  }

  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(videoSrc)
        console.log(player)
        player.on('ended', () => {
          console.log('ended')
        })
        player.on('timeupdate', () => {
          setCurrentTime(player.currentTime())
        })
        console.log('Player Ready')
      })

      const exampleLink = 'Click this to see the example link'

      const overlay_content =
        '<div><button> <a href="https://www.w3schools.com" target="_blank">' +
        exampleLink +
        '</a></button></div>'

      player.overlay({
        overlays: [
          {
            // This overlay will appear when a video is playing and disappear when
            // the player is paused.
            content: overlay_content,
            class: 'overlaycss',
            start: 4,
            end: 10,
            showBackground: true,
            align: 'middle',
          },
          {
            // This overlay will appear when the "custom1" event is triggered and
            // disappear when the "custom2" event is triggered.
            start: 'click',
            end: 'click',
            content: 'This is the content when it pauses',
          },
        ],
      })
    }

    return () => {}
  }, [])

  return (
    <div style={{ height: '500px', width: '500px' }}>
      <div id="overlay">The videojs version of an overlay</div>
      <video
        style={{ width: '500px', height: '500px' }}
        ref={videoPlayerRef}
        className="video-js"
      />
      <span>Current Time: {currentTime}</span>
    </div>
  )
}
