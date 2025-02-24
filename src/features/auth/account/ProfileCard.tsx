import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileCard() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Change Profile Details
            </CardTitle>
            <CardDescription>
                Change profile picture, username, display name, and bio status
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ProfileEditForm />
        </CardContent>
    </Card>
  )
}
