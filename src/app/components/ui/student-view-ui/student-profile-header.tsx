import { StudentProfile } from "@/lib/types/database";
import { UniversityIcon } from "../../icons";
import { AvatarIcon } from "../general/avatar-icon-component";
import { Button } from "../general/button";
import { TagComponent } from "../general/tag-component";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import React from "react";

interface Props {
    isEditable?: boolean;
    initialProfile: StudentProfile;
    onProfileUpdate: (updatedData: Partial<StudentProfile>) => void;
}


export default function StudentProfileHeader({ isEditable = false, initialProfile, onProfileUpdate }: Props) {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null); // You need the user object
    const [isUploading, setIsUploading] = useState(false);

    React.useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });
    }, [supabase]);

    const handleAvatarUpdate = async (file: File) => {
        if (!user) {
            alert("You must be logged in to upload an avatar.");
            return;
        }

        try {
            setIsUploading(true);
            const fileName = `${user.id}/${Date.now()}`; // Unique file name under user's folder

            // 1. Upload the file to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("avatars") // your bucket name
                .upload(fileName, file, {
                    cacheControl: "3600",
                    upsert: false, // Set to true if you want to overwrite, false for unique files
                });

            if (uploadError) throw uploadError;

            // 2. Get the public URL of the uploaded file
            const { data: urlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(uploadData.path);

            const publicUrl = urlData.publicUrl;

            // 3. Update the 'picture' column in your 'student' table with the new URL
            const { error: dbError } = await supabase
                .from("student")
                .update({ picture: publicUrl })
                .eq("user_id", user.id); // Or match by studentid

            if (dbError) throw dbError;

             onProfileUpdate({ picture: publicUrl });

            alert("Avatar updated successfully!");

        } catch (error) {
            console.error("Error updating avatar:", error);
            alert("Failed to update avatar.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleCoverPhotoUpdate = async (file: File) => {
        if (!user) {
            alert("You must be logged in to upload an avatar.");
            return;
        }
        
        try {
            setIsUploading(true);
            const fileName = `${user.id}/cover-${Date.now()}`; // Use a slightly different name
            const { data: uploadData, error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);
            const publicUrl = urlData.publicUrl;

            // Update the 'cover_photo' column
            const { error: dbError } = await supabase
                .from("student")
                .update({ cover_photo: publicUrl }) // <-- Updates 'cover_photo'
                .eq("user_id", user.id);

            if (dbError) throw dbError;

            // Tell the parent to update the 'cover_photo' property
            onProfileUpdate({ cover_photo: publicUrl });

            alert("Cover photo updated successfully!");
        } catch (error) {
            console.error("Error updating cover photo:", error);
            alert("Failed to update cover photo.");
        } finally {
            setIsUploading(false);
        }
    };
    return (
        <header className="bg-white relative w-full h-73">
            <div className="absolute flex flex-col w-full h-full">
                <div className="z-0 aspect-[16/9] bg-action-light-blue overflow-hidden w-full rounded-2xl">
                    <AvatarIcon className="border-0 rounded-2xl object-center object-cover w-full h-full" onImageChange={handleCoverPhotoUpdate} isEditable={isEditable} src={initialProfile.cover_photo}></AvatarIcon>

                </div>
                <div className="min-h-20 max-h-25 h-full">
                    <div className="flex flex-col">
                        <h1 className="ml-37 text-primary-forest-green font-bold text-2xl">{`${initialProfile.fname} ${initialProfile.lname}`}</h1>
                        {/* <div className="flex ml-37 gap-2">
                            <UniversityIcon className="size-7"/>
                       </div> */}
                    </div>
                </div>
                <div className="flex absolute size-35 w-full bottom-0">
                    <AvatarIcon className="size-35 bg-white" isEditable={isEditable} onImageChange={handleAvatarUpdate} src={initialProfile.picture}></AvatarIcon>
                </div>
            </div>
        </header>
    );
}