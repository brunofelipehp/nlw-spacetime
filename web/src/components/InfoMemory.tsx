'use client'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'

import { Camera } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { MediaPicker } from './MediaPicker'

interface InfoMemoryProps {
  isPublic?: boolean
  coverUrl: string
  content: string
}

export function InfoMemory({
  isPublic,
  content,
  coverUrl: imageUrl,
}: InfoMemoryProps) {
  const router = useRouter()
  const params = useParams()

  async function updatedMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      const regexUrl = /^.*\.(jpg|jpeg|png)$/

      if (regexUrl.test(uploadResponse.data.fileUrl)) {
        coverUrl = uploadResponse.data.fileUrl
      } else {
        coverUrl = imageUrl
      }
    }

    const token = Cookie.get('token')

    await api.put(
      `/memories/${params.id}`,
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  console.log(isPublic)

  return (
    <form onSubmit={updatedMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="curso-pointer flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-700 text-purple-500"
            defaultChecked={!!isPublic}
          />
          Torna mémoria pública
        </label>
      </div>

      <MediaPicker searchImage={imageUrl} />

      <textarea
        name="content"
        spellCheck={false}
        defaultValue={content}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
