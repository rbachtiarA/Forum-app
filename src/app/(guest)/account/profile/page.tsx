import ProfileCard from "@/features/auth/account/ProfileCard";
import ProfilePictureEdit from "@/features/auth/account/ProfilePictureEdit";

export default function page() {
  return (
    <div className="w-full">
        <ProfilePictureEdit />
        <ProfileCard />
    </div>
  )
}
