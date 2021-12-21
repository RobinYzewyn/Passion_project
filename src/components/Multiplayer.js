import React, { useState, useEffect } from 'react'



const useMultiAudio = urls => {
  const [sources] = useState(
    urls.map(url => {
      return {
        url,
        audio: new Audio(url),
      }
    }),
  )

  const [players, setPlayers] = useState(
    urls.map(url => {
      return {
        url,
        playing: true,
      }
    }),
  )

  const toggle = targetIndex => () => {
      console.log('toggle');
    const newPlayers = [...players]
    const currentIndex = players.findIndex(p => p.playing === true)
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false
      newPlayers[targetIndex].playing = true
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false
    } else {
      newPlayers[targetIndex].playing = true
    }
    setPlayers(newPlayers)
  }

  toggle(0);

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause()
    })
  }, [sources, players])

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener('ended', () => {
        const newPlayers = [...players]
        newPlayers[i].playing = false
        setPlayers(newPlayers)
      })
    })
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener('ended', () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
        })
      })
    }
  }, [])

    

  return [players, toggle]
}

const MultiPlayer = ({ urls }) => {
  const [players, toggle] = useMultiAudio(urls)
    toggle(0);
  return (
    <div>
      {players.map((player, i) => (
        <div key={i}>
            {console.log(player)}
        <Player key={i} player={player} toggle={toggle(i)} />
        </div>
      ))}
    </div>
  )
}

const Player = ({ player, toggle }) => (
  <div>
    
  </div>
)


export default MultiPlayer