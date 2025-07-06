// app/components/ui/organization-view-ui/OrganizationProfileHeader.tsx
"use client";

import React, { useState } from 'react';
import { AvatarIcon } from '../general/avatar-icon-component';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/database.types'; // Your main database types
import { User } from '@supabase/supabase-js';

// Define Props based on the 'organizations' table row type
// We make it Partial<> because some data might be updated incrementally
type OrganizationProfile = Tables<'organizations'>;

interface Props {
    isEditable?: boolean;
    initialProfile: OrganizationProfile;
    // Callback to notify the parent page of updates
    onProfileUpdate: (updatedData: Partial<OrganizationProfile>) => void;
}

export default function OrganizationProfileHeader({
    isEditable = false,
    initialProfile,
    onProfileUpdate
}: Props) {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Get the user once to know if they can edit (you might expand this with RLS checks)
    React.useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    }, [supabase]);

    // A single, reusable function to handle image uploads
    const handleImageUpdate = async (
        file: File,
        columnToUpdate: 'picture' | 'cover_photo_path'
    ) => {
        if (!user || !isEditable) {
            alert("You do not have permission to edit this profile.");
            return;
        }

        const bucketName = 'avatars'; // Assuming you use the same bucket
        const oldUrl = initialProfile[columnToUpdate];

        try {
            setIsUploading(true);
            const fileExtension = file.name.split('.').pop();
            const fileName = `orgs/${initialProfile.orgid}/${columnToUpdate}-${Date.now()}.${fileExtension}`;

            // 1. Upload new image
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file);
            if (uploadError) throw uploadError;

            // 2. Get public URL
            const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(uploadData.path);
            const publicUrl = urlData.publicUrl;

            // 3. Update the database
            const { error: dbError } = await supabase
                .from('organizations')
                .update({ [columnToUpdate]: publicUrl })
                .eq('orgid', initialProfile.orgid);
            if (dbError) throw dbError;

            // 4. Notify the parent component to update its state
            onProfileUpdate({ [columnToUpdate]: publicUrl });

            // 5. Delete the old image (optional but good practice)
            if (oldUrl) {
                const oldPath = oldUrl.split(`/${bucketName}/`)[1];
                if (oldPath) {
                    await supabase.storage.from(bucketName).remove([oldPath]);
                }
            }

            alert("Image updated successfully!");
        } catch (error) {
            console.error(`Error updating ${columnToUpdate}:`, error);
            alert("Failed to update image.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <header className="bg-white relative w-full h-73">
            {isUploading && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50 rounded-2xl">
                    <div className="text-white text-lg font-bold">Uploading...</div>
                </div>
            )}
            <div className="absolute flex flex-col w-full h-full">
                {/* Cover Photo */}
                <div className="z-0 aspect-[16/9] bg-gray-300 overflow-hidden w-full rounded-2xl">
                    <AvatarIcon
                        className="border-0 rounded-2xl object-center object-cover w-full h-full"
                        onImageChange={(file) => handleImageUpdate(file, 'cover_photo_path')}
                        isEditable={isEditable}
                        src={initialProfile.cover_photo_path}
                        isLoading={isUploading}
                    />
                </div>
                {/* Profile Info Area */}
                <div className="min-h-20 max-h-25 h-full">
                    <div className="flex flex-col">
                        <h1 className="ml-37 text-primary-forest-green font-bold text-2xl">
                            {initialProfile.orgname || "Organization Name"}
                        </h1>
                        {/* You can add more org details here */}
                    </div>
                </div>
                {/* Profile Picture */}
                <div className="flex absolute size-35 w-full bottom-0">
                    <AvatarIcon
                        className="size-35 bg-white"
                        isEditable={isEditable}
                        onImageChange={(file) => handleImageUpdate(file, 'picture')}
                        src={initialProfile.picture}
                        isLoading={isUploading}
                    />
                </div>
            </div>
        </header>
    );
}