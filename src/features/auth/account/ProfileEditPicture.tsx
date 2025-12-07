/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";
import { CameraIcon, EditIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { deleteUserProfilePicture, updateUserProfilePicture } from "../action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMAGE } from "@/constant/image";

export default function ProfileEditPicture() {
  const queryClient = useQueryClient();
  const { data } = useUserProfile();
  const [error, setError] = useState<string | null>(null);
  const profilePicture = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | undefined | null>(
    null
  );
  const selectedPreviewImage = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return data?.picture;
  }, [selectedImage, data]);

  const isDirty = useMemo(() => {
    return !(selectedPreviewImage === data?.picture);
  }, [selectedPreviewImage, data]);

  const { mutateAsync: updateProfilePicture } = useMutation({
    mutationFn: updateUserProfilePicture,
    mutationKey: ["userProfile"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      setSelectedImage(null);
      setError(null);
    },
  });

  const { mutateAsync: deleteProfilePicture } = useMutation({
    mutationFn: deleteUserProfilePicture,
    mutationKey: ["userProfile"],
    onSuccess: () => {
      alert("success delete profile picture");
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      setSelectedImage(null);
      setError(null);
    },
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 500 * 1024; // 500kb
    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
    const file = e.currentTarget.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 500kb");
        return;
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError("file type not supported");
        return;
      }
      setError(null);
      setSelectedImage(file);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setError(null);
    if (profilePicture.current) {
      profilePicture.current.value = "";
    }
  };

  const handleClick = () => {
    if (profilePicture.current) {
      profilePicture.current.click();
    }
  };

  const handleApply = async () => {
    if (!selectedImage) return;
    updateProfilePicture(selectedImage);
  };

  const handleDelete = async () => {
    if (!data?.picture) return;
    const confirm = window.confirm(
      "Are you sure you want to delete your profile picture?"
    );
    if (confirm) {
      deleteProfilePicture();
    }
  };

  return (
    <Card className="border-none h-full flex flex-col justify-between">
      <CardContent className="flex flex-col justify-center items-center gap-2 h-full">
        <div className="relative group">
          <div className="relative w-[200px] h-[200px] overflow-hidden cursor-pointer rounded-full">
            <div
              onClick={handleClick}
              className="absolute w-full h-full rounded-full flex flex-col justify-center items-center bg-black opacity-0 hover:opacity-65 transition-all duration-300 ease-in-out gap-2"
            >
              <CameraIcon className="text-white" size={30} />
              <p className="text-white font-bold">Change profile picture</p>
            </div>
            <img
              src={
                !selectedPreviewImage
                  ? IMAGE.AVATAR.default
                  : selectedPreviewImage
              }
              className="w-[200px] h-[200px] rounded-full"
              alt="preview image"
            />
          </div>
          <div className="absolute bg-primary rounded-full p-2 border-background border-4 right-2 bottom-2 group-hover:bg-primary/90">
            <EditIcon className="text-primary-foreground" size={20} />
          </div>
        </div>
        <p className={`${error ?? "hidden"} text-destructive`}>{error}</p>
        <input
          ref={profilePicture}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </CardContent>
      <CardFooter className="flex gap-2 justify-center p-0">
        <Button disabled={!isDirty} onClick={handleApply}>
          Apply
        </Button>
        <Button
          onClick={handleReset}
          className={`${isDirty ? "" : "hidden"}`}
          disabled={!isDirty}
          variant={"destructive"}
        >
          Reset
        </Button>
        <Button
          onClick={handleDelete}
          className="font-bold"
          disabled={!data?.picture}
          variant={"destructive"}
        >
          Remove picture
        </Button>
      </CardFooter>
    </Card>
  );
}
