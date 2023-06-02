'use client'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useParams } from 'next/navigation'
import { InfoMemory } from './InfoMemory'

export interface MemoryProps {
  isPublic: boolean
  coverUrl: string
  content: string
}

export async function Memory() {
  const params = useParams()

  const token = Cookie.get('token')

  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const { isPublic, content, coverUrl } = response.data

  return (
    <div>
      <InfoMemory isPublic={isPublic} coverUrl={coverUrl} content={content} />
    </div>
  )
}
