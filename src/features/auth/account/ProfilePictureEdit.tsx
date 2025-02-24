'use client'

import { Button } from "@/components/ui/button"
import { useMemo, useRef, useState } from "react"
import { z } from "zod"

const profilePictureSchema = z.object({
    file: z.instanceof(File).refine((file) => file.size < 1024 * 1024, "File size must be below 1MB")
});

export default function ProfilePictureEdit() {
    const [previewImage, setPreviewImage] = useState<File | undefined | null>(null)
    const profileEditPicture = useRef<HTMLInputElement>(null)

    const selectedPreviewImage = useMemo(() => {
            if(previewImage) {
                return URL.createObjectURL(previewImage)
            }
            return null
        },[previewImage]
    )
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]
        if(file) {
            setPreviewImage(file)
        }
    }

    const handleReset = () => {
        setPreviewImage(null)
        if(profileEditPicture.current) {
            profileEditPicture.current.value = ""
        }
    }
  return (
    <div>
        {
            selectedPreviewImage &&
            // eslint-disable-next-line @next/next/no-img-element
            <img src={selectedPreviewImage??''} className="w-[200px] h-[200px]" alt="preview image"/>    
        }
        <input type='file' className="hidden" accept="image/*" ref={profileEditPicture}  onChange={handleImageChange} />
        <Button type={'button'} onClick={() => {
            if(profileEditPicture.current) {
                profileEditPicture.current.click()
            }
        }}>
            Edit Picture
        </Button>
        <Button type={'button'} variant={'destructive'} onClick={handleReset}>
            reset
        </Button>
    </div>
  )
}
