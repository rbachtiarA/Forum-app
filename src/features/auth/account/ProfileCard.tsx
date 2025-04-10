import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileEditForm from "./ProfileEditForm";
import ProfileEditPicture from "./ProfileEditPicture";

export default function ProfileCard() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                My Profile
            </CardTitle>
            <CardDescription>
                Change profile picture, username, display name, and bio status
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-y-4">
                <ProfileEditPicture />
                <ProfileEditForm />
            </div>
        </CardContent>
    </Card>
  )
}
