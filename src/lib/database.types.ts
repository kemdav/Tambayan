export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      accreditations: {
        Row: {
          academic_year: string
          created_at: string | null
          file_path: string | null
          id: number
          orgid: string
          reviewer_notes: string | null
          submission_status: string
          submitted_at: string | null
          universityid: string
          updated_at: string | null
        }
        Insert: {
          academic_year: string
          created_at?: string | null
          file_path?: string | null
          id?: number
          orgid: string
          reviewer_notes?: string | null
          submission_status?: string
          submitted_at?: string | null
          universityid: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          created_at?: string | null
          file_path?: string | null
          id?: number
          orgid?: string
          reviewer_notes?: string | null
          submission_status?: string
          submitted_at?: string | null
          universityid?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accreditations_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
          {
            foreignKeyName: "accreditations_universityid_fkey"
            columns: ["universityid"]
            isOneToOne: false
            referencedRelation: "university"
            referencedColumns: ["universityid"]
          },
        ]
      }
      broadcast: {
        Row: {
          date: string | null
          id: number
          message: string | null
          recipient: string | null
          title: string | null
          universityid: string | null
        }
        Insert: {
          date?: string | null
          id?: number
          message?: string | null
          recipient?: string | null
          title?: string | null
          universityid?: string | null
        }
        Update: {
          date?: string | null
          id?: number
          message?: string | null
          recipient?: string | null
          title?: string | null
          universityid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_universityid_fkey"
            columns: ["universityid"]
            isOneToOne: false
            referencedRelation: "university"
            referencedColumns: ["universityid"]
          },
        ]
      }
      comments: {
        Row: {
          attachment: string | null
          comment_text: string | null
          orgid: string | null
          posted: string | null
          postid: number | null
          studentid: number | null
        }
        Insert: {
          attachment?: string | null
          comment_text?: string | null
          orgid?: string | null
          posted?: string | null
          postid?: number | null
          studentid?: number | null
        }
        Update: {
          attachment?: string | null
          comment_text?: string | null
          orgid?: string | null
          posted?: string | null
          postid?: number | null
          studentid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
          {
            foreignKeyName: "comments_postid_fkey"
            columns: ["postid"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["postid"]
          },
          {
            foreignKeyName: "comments_studentid_fkey"
            columns: ["studentid"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["studentid"]
          },
        ]
      }
      eventanalytics: {
        Row: {
          orgid: string
          total: number | null
          totalevents: number | null
        }
        Insert: {
          orgid: string
          total?: number | null
          totalevents?: number | null
        }
        Update: {
          orgid?: string
          total?: number | null
          totalevents?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "eventanalytics_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
        ]
      }
      eventattendance: {
        Row: {
          eventid: number
          rating: number | null
          studentid: number
        }
        Insert: {
          eventid: number
          rating?: number | null
          studentid: number
        }
        Update: {
          eventid?: number
          rating?: number | null
          studentid?: number
        }
        Relationships: [
          {
            foreignKeyName: "eventattendance_eventid_fkey"
            columns: ["eventid"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["eventid"]
          },
          {
            foreignKeyName: "eventattendance_studentid_fkey"
            columns: ["studentid"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["studentid"]
          },
        ]
      }
      eventdata: {
        Row: {
          eventid: number
          totalparticipants: number | null
        }
        Insert: {
          eventid: number
          totalparticipants?: number | null
        }
        Update: {
          eventid?: number
          totalparticipants?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "eventdata_eventid_fkey"
            columns: ["eventid"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["eventid"]
          },
        ]
      }
      eventregistrations: {
        Row: {
          created_at: string | null
          eventid: number
          studentid: number
        }
        Insert: {
          created_at?: string | null
          eventid: number
          studentid: number
        }
        Update: {
          created_at?: string | null
          eventid?: number
          studentid?: number
        }
        Relationships: [
          {
            foreignKeyName: "eventregistrations_eventid_fkey"
            columns: ["eventid"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["eventid"]
          },
          {
            foreignKeyName: "eventregistrations_studentid_fkey"
            columns: ["studentid"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["studentid"]
          },
        ]
      }
      events: {
        Row: {
          date: string | null
          description: string | null
          eventid: number
          location: string | null
          orgid: string | null
          registered: number | null
          status: string | null
          title: string | null
          universityid: string | null
        }
        Insert: {
          date?: string | null
          description?: string | null
          eventid?: number
          location?: string | null
          orgid?: string | null
          registered?: number | null
          status?: string | null
          title?: string | null
          universityid?: string | null
        }
        Update: {
          date?: string | null
          description?: string | null
          eventid?: number
          location?: string | null
          orgid?: string | null
          registered?: number | null
          status?: string | null
          title?: string | null
          universityid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
          {
            foreignKeyName: "events_universityid_fkey"
            columns: ["universityid"]
            isOneToOne: false
            referencedRelation: "university"
            referencedColumns: ["universityid"]
          },
        ]
      }
      likedby: {
        Row: {
          postid: number
          studentid: number
        }
        Insert: {
          postid: number
          studentid: number
        }
        Update: {
          postid?: number
          studentid?: number
        }
        Relationships: [
          {
            foreignKeyName: "likedby_postid_fkey"
            columns: ["postid"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["postid"]
          },
          {
            foreignKeyName: "likedby_studentid_fkey"
            columns: ["studentid"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["studentid"]
          },
        ]
      }
      organizations: {
        Row: {
          category: string | null
          cover_photo_path: string | null
          created: string | null
          orgid: string
          orgname: string | null
          picture: string | null
          status: string | null
          universityid: string | null
        }
        Insert: {
          category?: string | null
          cover_photo_path?: string | null
          created?: string | null
          orgid: string
          orgname?: string | null
          picture?: string | null
          status?: string | null
          universityid?: string | null
        }
        Update: {
          category?: string | null
          cover_photo_path?: string | null
          created?: string | null
          orgid?: string
          orgname?: string | null
          picture?: string | null
          status?: string | null
          universityid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_universityid_fkey"
            columns: ["universityid"]
            isOneToOne: false
            referencedRelation: "university"
            referencedColumns: ["universityid"]
          },
        ]
      }
      orgmember: {
        Row: {
          orgid: string
          position: string | null
          studentid: number
        }
        Insert: {
          orgid: string
          position?: string | null
          studentid: number
        }
        Update: {
          orgid?: string
          position?: string | null
          studentid?: number
        }
        Relationships: [
          {
            foreignKeyName: "orgmember_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
          {
            foreignKeyName: "orgmember_studentid_fkey"
            columns: ["studentid"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["studentid"]
          },
        ]
      }
      post: {
        Row: {
          attachment: string | null
          body: string | null
          isofficial: boolean | null
          ispinned: boolean | null
          orgid: string | null
          posted: string | null
          postid: number
          studentid: number | null
          subject: string | null
        }
        Insert: {
          attachment?: string | null
          body?: string | null
          isofficial?: boolean | null
          ispinned?: boolean | null
          orgid?: string | null
          posted?: string | null
          postid?: number
          studentid?: number | null
          subject?: string | null
        }
        Update: {
          attachment?: string | null
          body?: string | null
          isofficial?: boolean | null
          ispinned?: boolean | null
          orgid?: string | null
          posted?: string | null
          postid?: number
          studentid?: number | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
          {
            foreignKeyName: "post_studentid_fkey"
            columns: ["studentid"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["studentid"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["postid"]
          },
        ]
      }
      staff: {
        Row: {
          email: string | null
          isadvisor: boolean | null
          orgid: string | null
          position: string | null
          profile: string | null
          teacherid: number
        }
        Insert: {
          email?: string | null
          isadvisor?: boolean | null
          orgid?: string | null
          position?: string | null
          profile?: string | null
          teacherid?: number
        }
        Update: {
          email?: string | null
          isadvisor?: boolean | null
          orgid?: string | null
          position?: string | null
          profile?: string | null
          teacherid?: number
        }
        Relationships: [
          {
            foreignKeyName: "staff_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
        ]
      }
      student: {
        Row: {
          about: string | null
          course: string | null
          cover_photo: string | null
          email: string | null
          fname: string | null
          lname: string | null
          mname: string | null
          password: string | null
          picture: string | null
          studentid: number
          universityid: string | null
          user_id: string | null
          yearlevel: string | null
        }
        Insert: {
          about?: string | null
          course?: string | null
          cover_photo?: string | null
          email?: string | null
          fname?: string | null
          lname?: string | null
          mname?: string | null
          password?: string | null
          picture?: string | null
          studentid?: number
          universityid?: string | null
          user_id?: string | null
          yearlevel?: string | null
        }
        Update: {
          about?: string | null
          course?: string | null
          cover_photo?: string | null
          email?: string | null
          fname?: string | null
          lname?: string | null
          mname?: string | null
          password?: string | null
          picture?: string | null
          studentid?: number
          universityid?: string | null
          user_id?: string | null
          yearlevel?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_universityid_fkey"
            columns: ["universityid"]
            isOneToOne: false
            referencedRelation: "university"
            referencedColumns: ["universityid"]
          },
        ]
      }
      subscribedorg: {
        Row: {
          orgid: string
          studentid: number
        }
        Insert: {
          orgid: string
          studentid: number
        }
        Update: {
          orgid?: string
          studentid?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscribedorg_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
          {
            foreignKeyName: "subscribedorg_studentid_fkey"
            columns: ["studentid"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["studentid"]
          },
        ]
      }
      university: {
        Row: {
          attachment: string | null
          password: string | null
          uname: string | null
          unicontact: string | null
          universityemail: string | null
          universityid: string
        }
        Insert: {
          attachment?: string | null
          password?: string | null
          uname?: string | null
          unicontact?: string | null
          universityemail?: string | null
          universityid?: string
        }
        Update: {
          attachment?: string | null
          password?: string | null
          uname?: string | null
          unicontact?: string | null
          universityemail?: string | null
          universityid?: string
        }
        Relationships: []
      }
      verification: {
        Row: {
          code: string | null
          isconfirmed: boolean | null
          studentid: number
        }
        Insert: {
          code?: string | null
          isconfirmed?: boolean | null
          studentid: number
        }
        Update: {
          code?: string | null
          isconfirmed?: boolean | null
          studentid?: number
        }
        Relationships: [
          {
            foreignKeyName: "verification_studentid_fkey"
            columns: ["studentid"]
            isOneToOne: true
            referencedRelation: "student"
            referencedColumns: ["studentid"]
          },
        ]
      }
      wiki: {
        Row: {
          content: string | null
          created: string | null
          lastupdated: string | null
          orgid: string | null
          position: string | null
          section: string | null
          wikiid: number
        }
        Insert: {
          content?: string | null
          created?: string | null
          lastupdated?: string | null
          orgid?: string | null
          position?: string | null
          section?: string | null
          wikiid?: number
        }
        Update: {
          content?: string | null
          created?: string | null
          lastupdated?: string | null
          orgid?: string | null
          position?: string | null
          section?: string | null
          wikiid?: number
        }
        Relationships: [
          {
            foreignKeyName: "wiki_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_university_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_like_count: {
        Args: { p_post_id: number }
        Returns: number
      }
      get_organizations_for_join_page: {
        Args: { p_user_id: string }
        Returns: {
          org_id: string
          org_name: string
          org_status: string
          picture_path: string
          cover_photo_path: string
          member_count: number
          event_count: number
          is_subscribed: boolean
        }[]
      }
      get_student_stats: {
        Args: { p_student_id: number }
        Returns: {
          organizations_joined_count: number
          events_joined_count: number
        }[]
      }
      get_subscribed_organizations: {
        Args: { p_user_id: string }
        Returns: {
          org_id: string
          org_name: string
          org_status: string
          picture_path: string
          cover_photo_path: string
          member_count: number
          event_count: number
        }[]
      }
      get_user_org_options: {
        Args: Record<PropertyKey, never>
        Returns: {
          value: string
          label: string
        }[]
      }
      get_user_subscribed_org_options: {
        Args: Record<PropertyKey, never>
        Returns: {
          value: string
          label: string
        }[]
      }
      is_org_member: {
        Args: { user_id_to_check: string; org_id_to_check: string }
        Returns: boolean
      }
      is_org_officer: {
        Args: { user_id_to_check: string; org_id_to_check: string }
        Returns: boolean
      }
      test_add_event_count: {
        Args: { p_uni_id: string }
        Returns: {
          org_id: string
          org_name: string
          event_count: number
        }[]
      }
      test_add_member_count: {
        Args: { p_uni_id: string }
        Returns: {
          org_id: string
          org_name: string
          member_count: number
        }[]
      }
      test_function: {
        Args: { uni_id: string }
        Returns: {
          orgid: string
          orgname: string
        }[]
      }
      test_function_creation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      test_read_organizations: {
        Args: { p_uni_id: string }
        Returns: {
          org_id: string
          org_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
