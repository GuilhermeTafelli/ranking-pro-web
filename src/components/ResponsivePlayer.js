import React from 'react'
import ReactPlayer from 'react-player'

const ResponsivePlayer = () => {
  
      return (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url='https://www.youtube.com/watch?v=hhZ6yFvCWho'
          />
        </div>
      )
}

export default ResponsivePlayer