'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import React from 'react'

const NextMeeting = () => {
  const { upcomingCalls } = useGetCalls()
  if (upcomingCalls.length === 0) {
    return (
      <>
        No upcoming meetings
      </>
    )
  }

  if (upcomingCalls.length === 1) {
    return (
      <>
        Next meeting at {upcomingCalls[0].state?.startsAt?.toLocaleString()}
      </>
    )
  }
  if (upcomingCalls.length > 1) {

    upcomingCalls.sort((a, b) => {
      return (a.state?.startsAt?.getTime() ?? 0) - (b.state?.startsAt?.getTime() ?? 0);
    })
  
  
    const nextMeeting = upcomingCalls[0]
  
    return (
      <>
        Next meeting on {nextMeeting.state?.startsAt?.toLocaleDateString() + ' at ' + nextMeeting.state?.startsAt?.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
      </>
    )
  }
}

export default NextMeeting