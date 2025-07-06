"use server";
import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/database.types";

export type AccreditationStatus = 'Pending' | 'Approved' | 'Revision' | 'Rejected';

export interface AccreditationData {
  orgid: string;
  orgname: string | null;
  status: string | null;
  created: string | null;
  universityid: string | null;
  university?: { uname: string | null } | null;
}

export interface AccreditationStats {
  pending_count: number;
  approved_count: number;
  revision_count: number;
  rejected_count: number;
}

// Get all organizations for accreditation review
export async function getOrganizationsForAccreditation(): Promise<AccreditationData[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('organizations')
    .select('orgid, orgname, status, created, universityid, university:universityid(uname)')
    .order('created', { ascending: false });

  if (error) {
    console.error('Error fetching organizations for accreditation:', error);
    return [];
  }

  return data || [];
}

// Get organizations by status (using the existing status field)
export async function getOrganizationsByStatus(status: string): Promise<AccreditationData[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('organizations')
    .select('orgid, orgname, status, created, universityid, university:universityid(uname)')
    .eq('status', status)
    .order('created', { ascending: false });

  if (error) {
    console.error('Error fetching organizations by status:', error);
    return [];
  }

  return data || [];
}

// Get accreditation statistics based on organization status
export async function getAccreditationStats(): Promise<AccreditationStats> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('organizations')
    .select('status');

  if (error) {
    console.error('Error fetching accreditation stats:', error);
    return {
      pending_count: 0,
      approved_count: 0,
      revision_count: 0,
      rejected_count: 0
    };
  }

  const stats = {
    pending_count: 0,
    approved_count: 0,
    revision_count: 0,
    rejected_count: 0
  };

  data?.forEach(org => {
    switch (org.status) {
      case 'Pending':
        stats.pending_count++;
        break;
      case 'Approved':
        stats.approved_count++;
        break;
      case 'Revision':
        stats.revision_count++;
        break;
      case 'Rejected':
        stats.rejected_count++;
        break;
    }
  });

  return stats;
}

// Update organization accreditation status
export async function updateOrganizationAccreditationStatus(
  orgid: string, 
  status: AccreditationStatus
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('organizations')
    .update({ status })
    .eq('orgid', orgid);

  if (error) {
    console.error('Error updating organization accreditation status:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Get organizations with university details
export async function getOrganizationsWithUniversity(): Promise<AccreditationData[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('organizations')
    .select(`
      orgid,
      orgname,
      status,
      created,
      universityid,
      university:universityid(uname)
    `)
    .order('created', { ascending: false });

  if (error) {
    console.error('Error fetching organizations with university:', error);
    return [];
  }

  return data?.map(org => ({
    orgid: org.orgid,
    orgname: org.orgname,
    status: org.status,
    created: org.created,
    universityid: org.universityid,
    university: org.university
  })) || [];
} 