// app/organization/[org-id]/manage/officers/OfficersClient.tsx
"use client";

import { useState } from 'react';
import { Tables } from '@/lib/database.types';
import { updateMemberRole, removeMember } from '@/lib/actions/organization';
import { AvatarIcon } from '@/app/components/ui/general/avatar-icon-component'; // Assuming you have this

type OrganizationProfile = Tables<'organizations'>;

// Define a more specific type for members based on the server action's select query
type Member = {
    studentid: number;
    position: string | null;
    student: {
        fname: string | null;
        mname: string | null;
        lname: string | null;
        picture: string | null;
    } | null;
};

interface OfficersClientProps {
    orgId: string;
    organization: OrganizationProfile | null;
    initialMembers: Member[];
    canManage: boolean;
}

const roleOptions = ["President", "Vice President", "Secretary", "Treasurer", "PRO", "Member"];

export default function OfficersClient({ orgId, organization, initialMembers, canManage }: OfficersClientProps) {
    const [members, setMembers] = useState(initialMembers);
    const [isSubmitting, setIsSubmitting] = useState<number | null>(null); // Track which row is submitting

    const handleRoleChange = (studentId: number, newRole: string) => {
        setMembers(currentMembers =>
            currentMembers.map(member =>
                member.studentid === studentId ? { ...member, position: newRole } : member
            )
        );
    };
    
    const handleSaveChanges = async (studentId: number) => {
        setIsSubmitting(studentId);
        const member = members.find(m => m.studentid === studentId);
        if (!member || !member.position) {
            alert("Role cannot be empty.");
            setIsSubmitting(null);
            return;
        }

        const result = await updateMemberRole(orgId, studentId, member.position);
        if (result.error) {
            alert(result.error);
            // Optional: revert state on error
        }
        setIsSubmitting(null);
    };

    const handleRemoveMember = async (studentId: number) => {
        if (!confirm("Are you sure you want to remove this member? This action is permanent.")) return;
        
        setIsSubmitting(studentId);
        const result = await removeMember(orgId, studentId);
        if (result.error) {
            alert(result.error);
        }
        // Revalidation on the server will refresh the list, no need to manually filter client state
        setIsSubmitting(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 p-4">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b">
                <AvatarIcon src={organization?.picture} alt={organization?.orgname || 'Org'} className="h-20 w-20" />
                <h1 className="text-3xl font-bold text-gray-800">{organization?.orgname}</h1>
            </div>

            {/* Member Management Table */}
            <div className="mt-6 bg-white border rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Manage Members</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                {canManage && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map(member => (
                                <tr key={member.studentid}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <AvatarIcon src={member.student?.picture} alt={member.student?.fname || ''} className="h-10 w-10" />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {`${member.student?.fname || ''} ${member.student?.mname ? member.student.mname[0] + '.' : ''} ${member.student?.lname || ''}`}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {canManage ? (
                                            <select
                                                value={member.position || 'Member'}
                                                onChange={(e) => handleRoleChange(member.studentid, e.target.value)}
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                            >
                                                {roleOptions.map(role => <option key={role} value={role}>{role}</option>)}
                                            </select>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {member.position || 'Member'}
                                            </span>
                                        )}
                                    </td>
                                    {canManage && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => handleSaveChanges(member.studentid)}
                                                disabled={isSubmitting === member.studentid}
                                                className="px-3 py-1 text-xs text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                                            >
                                                {isSubmitting === member.studentid ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={() => handleRemoveMember(member.studentid)}
                                                disabled={isSubmitting === member.studentid}
                                                className="px-3 py-1 text-xs text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-gray-400"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}