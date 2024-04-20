'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import { useToast } from './ui/use-toast'

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isCallsLoading } = useGetCalls()
  const router = useRouter()
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const { toast } = useToast()

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls
      case 'upcoming':
        return upcomingCalls
      case 'recordings':
        return recordings
      default:
        return []
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Ended Calls'
      case 'upcoming':
        return 'No Upcoming Calls'
      case 'recordings':
        return 'No Recordings'
      default:
        return ''
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(callRecordings
          .map((meeting) => meeting.queryRecordings()))
        
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings)
  
        setRecordings(recordings)    
      } catch (error) {
        toast({
          title: 'Try again later',
          variant: 'destructive',
        })
      }
    }

    if (type === 'recordings') fetchRecordings()
  }, [type, callRecordings])

  const calls = getCalls()
  const noCallsMessage = getNoCallsMessage()

  if (isCallsLoading) return <Loader />

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
        <MeetingCard 
          key={(meeting as Call).id} 
          title={(meeting as Call).state?.custom?.description?.substring(0, 24) 
            || (meeting as CallRecording)?.filename?.substring(0,24) || 'Personal Meeting'}
          date={(meeting as Call).state?.startsAt?.toLocaleString() 
            || (meeting as CallRecording).start_time.toLocaleString()}
          icon={
            type === 'ended' ? '/icons/previous.svg' : 
            type === 'upcoming' ? '/icons/upcoming.svg' :
            '/icons/recordings.svg'
          }
          isPreviousMeeting={type === 'ended'} 
          handleClick={type === 'recordings' ? () => router.push(`${(meeting as CallRecording).url}`)
           : 
          () => router.push(`/meeting/${(meeting as Call).id}`)}
          link={type === 'recordings' ? (meeting as CallRecording).url : 
          `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
          buttonText={type === 'recordings' ? 'Play' : 'Start'}
          buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
        />
      )) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList