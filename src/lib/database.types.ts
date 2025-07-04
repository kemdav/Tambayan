export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          query?: string
          operationName?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      broadcast: {
        Row: {
          attachment: string | null
          date: string | null
          message: string | null
          recipient: string | null
          title: string | null
          universityid: string | null
        }
        Insert: {
          attachment?: string | null
          date?: string | null
          message?: string | null
          recipient?: string | null
          title?: string | null
          universityid?: string | null
        }
        Update: {
          attachment?: string | null
          date?: string | null
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
          comment: string | null
          orgid: string | null
          posted: string | null
          postid: number | null
          studentid: number | null
        }
        Insert: {
          attachment?: string | null
          comment?: string | null
          orgid?: string | null
          posted?: string | null
          postid?: number | null
          studentid?: number | null
        }
        Update: {
          attachment?: string | null
          comment?: string | null
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
        }
        Relationships: [
          {
            foreignKeyName: "events_orgid_fkey"
            columns: ["orgid"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["orgid"]
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
          cover_photo_path: string | null
          created: string | null
          orgid: string
          orgname: string | null
          picture: string | null
          status: string | null
          universityid: string | null
        }
        Insert: {
          cover_photo_path?: string | null
          created?: string | null
          orgid: string
          orgname?: string | null
          picture?: string | null
          status?: string | null
          universityid?: string | null
        }
        Update: {
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
          comments: number | null
          isofficial: boolean | null
          ispinned: boolean | null
          likes: number | null
          orgid: string | null
          posted: string | null
          postid: number
          studentid: number | null
          subject: string | null
        }
        Insert: {
          attachment?: string | null
          body?: string | null
          comments?: number | null
          isofficial?: boolean | null
          ispinned?: boolean | null
          likes?: number | null
          orgid?: string | null
          posted?: string | null
          postid?: number
          studentid?: number | null
          subject?: string | null
        }
        Update: {
          attachment?: string | null
          body?: string | null
          comments?: number | null
          isofficial?: boolean | null
          ispinned?: boolean | null
          likes?: number | null
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
          universityid: string
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
      test_add_event_count: {
        Args: { p_uni_id: string }
        Returns: {
          org_name: string
          org_id: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

