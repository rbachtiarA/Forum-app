import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Profile } from "@prisma/client";

export default function UserProfileHeader({ userProfile }: { userProfile: Profile }) {
  const { username, name, bio, picture } = userProfile
  return (
    <div className="flex flex-col gap-y-2">
        <div className="flex gap-4 items-center">
            <Avatar>
                <AvatarImage src={picture || ''} />
                <AvatarFallback>{(username[0]+username[username.length-1]).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-2xl">{name?? 'Default name'}</p>
                <p className="text-muted-foreground">{username}</p>
            </div>
        </div>
        <p className={!bio ? 'text-muted-foreground' : ''}>
            {bio? bio : "User have not set a bio yet"}
        </p>
    </div>
  )
}
