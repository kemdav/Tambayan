// app/.../accreditation/AccreditationClient.tsx
"use client";

import { useState } from "react";
import { type Tables } from "@/lib/database.types";
import { submitAccreditationFile } from "@/lib/actions/accreditation";
import { FaFileUpload, FaCheckCircle, FaClock, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

type AccreditationStatus = Tables<'accreditations'>;

interface AccreditationClientProps {
    orgId: string;
    organizationName: string;
    academicYear: string;
    initialStatus: AccreditationStatus | null;
    canSubmit: boolean;
}

// Helper component to display the status with an icon and color
const StatusDisplay = ({ status, notes }: { status: string | null, notes?: string | null }) => {
    const statusText = status || "Not Submitted";
    let icon = <FaExclamationTriangle className="text-gray-500" />;
    let color = "text-gray-700";
    let bgColor = "bg-gray-100";

    switch (statusText) {
        case 'Pending Review':
            icon = <FaClock className="text-yellow-500" />;
            color = "text-yellow-800";
            bgColor = "bg-yellow-100";
            break;
        case 'Approved':
            icon = <FaCheckCircle className="text-green-500" />;
            color = "text-green-800";
            bgColor = "bg-green-100";
            break;
        case 'Rejected':
            icon = <FaTimesCircle className="text-red-500" />;
            color = "text-red-800";
            bgColor = "bg-red-100";
            break;
    }
    
    return (
        <div className={`p-4 rounded-lg border ${bgColor}`}>
            <div className={`flex items-center gap-3 font-semibold ${color}`}>
                {icon}
                <span>Status: {statusText}</span>
            </div>
            {statusText === 'Rejected' && notes && (
                <p className={`mt-2 text-sm ${color}`}><strong>Reviewer Notes:</strong> {notes}</p>
            )}
        </div>
    );
};


export default function AccreditationClient({ orgId, organizationName, academicYear, initialStatus, canSubmit }: AccreditationClientProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setError(null);
        } else {
            setFile(null);
            setError("Please select a valid PDF file.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !canSubmit) return;

        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append('accreditationPdf', file);

        const result = await submitAccreditationFile(orgId, academicYear, formData);

        if (result.error) {
            setError(result.error);
        } else {
            alert("File submitted successfully! The page will now refresh.");
            // The revalidatePath on the server will handle refreshing the data,
            // but a router.refresh() can force it if needed.
        }
        setIsSubmitting(false);
    };

    return (
        <main className="w-full max-w-3xl mx-auto p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Accreditation Submission</h1>
                <p className="text-md text-gray-600 mb-2">{organizationName}</p>
                <p className="text-sm text-gray-500 mb-6">Academic Year: {academicYear}</p>

                <div className="space-y-6">
                    <StatusDisplay status={initialStatus?.submission_status || null} notes={initialStatus?.reviewer_notes}/>
                    
                    {canSubmit ? (
                        <form onSubmit={handleSubmit} className="p-4 border-2 border-dashed rounded-lg">
                            <h2 className="font-semibold text-lg mb-2">Submit or Update Your File</h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Please upload all required documents as a single PDF file. Re-uploading will overwrite your previous submission.
                            </p>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                            {file && <p className="text-sm mt-2 text-gray-600">Selected: {file.name}</p>}
                            
                            <button
                                type="submit"
                                disabled={!file || isSubmitting}
                                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <FaFileUpload />
                                {isSubmitting ? 'Submitting...' : 'Submit PDF'}
                            </button>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </form>
                    ) : (
                        <div className="p-4 border rounded-lg bg-gray-50 text-center">
                            <p className="text-gray-600">Only the organization's President can submit accreditation files.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}