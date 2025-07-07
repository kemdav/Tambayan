// app/components/ui/student-view-ui/edit-about-modal.tsx
"use client";

import { useState } from 'react';
import { Button } from '../general/button';
import { updateStudentAbout } from '@/lib/actions/student';

interface EditAboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentAbout: string | null;
    onSave: (newAboutText: string) => void; // Callback to update parent state
}

export default function EditAboutModal({ isOpen, onClose, currentAbout, onSave }: EditAboutModalProps) {
    const [aboutText, setAboutText] = useState(currentAbout || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleSave = async () => {
        setIsSubmitting(true);
        const result = await updateStudentAbout(aboutText);
        setIsSubmitting(false);

        if (result.error) {
            alert(result.error);
        } else {
            // On success, call the onSave callback and close the modal
            onSave(result.newAboutText!);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <h2 className="text-xl font-bold mb-4">Edit Description</h2>
                <textarea
                    className="w-full border rounded-lg p-2 text-sm mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-action-forest-green"
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    placeholder="Tell us a little about yourself..."
                />
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
}