export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          activity_type: string
          affected_row_id: string | null
          affected_table: string | null
          description: string | null
          ip_address: string | null
          log_id: number
          timestamp: string | null
          user_id: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          activity_type: string
          affected_row_id?: string | null
          affected_table?: string | null
          description?: string | null
          ip_address?: string | null
          log_id?: number
          timestamp?: string | null
          user_id?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          activity_type?: string
          affected_row_id?: string | null
          affected_table?: string | null
          description?: string | null
          ip_address?: string | null
          log_id?: number
          timestamp?: string | null
          user_id?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      cell_coordinators: {
        Row: {
          coordinator_id: number
          created_at: string | null
          department: string | null
          email: string
          name: string
          phone_number: string | null
          role: Database["public"]["Enums"]["coordinator_role"]
          user_id: string | null
        }
        Insert: {
          coordinator_id?: number
          created_at?: string | null
          department?: string | null
          email: string
          name: string
          phone_number?: string | null
          role: Database["public"]["Enums"]["coordinator_role"]
          user_id?: string | null
        }
        Update: {
          coordinator_id?: number
          created_at?: string | null
          department?: string | null
          email?: string
          name?: string
          phone_number?: string | null
          role?: Database["public"]["Enums"]["coordinator_role"]
          user_id?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_id: number
          contact_person_email: string | null
          contact_person_name: string | null
          created_at: string | null
          headquarters_location: string | null
          industry: string | null
          name: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          company_id?: number
          contact_person_email?: string | null
          contact_person_name?: string | null
          created_at?: string | null
          headquarters_location?: string | null
          industry?: string | null
          name: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          company_id?: number
          contact_person_email?: string | null
          contact_person_name?: string | null
          created_at?: string | null
          headquarters_location?: string | null
          industry?: string | null
          name?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      internship_applications: {
        Row: {
          application_date: string
          application_id: number
          internship_id: number
          status: Database["public"]["Enums"]["application_status"] | null
          student_id: string
        }
        Insert: {
          application_date?: string
          application_id?: number
          internship_id: number
          status?: Database["public"]["Enums"]["application_status"] | null
          student_id: string
        }
        Update: {
          application_date?: string
          application_id?: number
          internship_id?: number
          status?: Database["public"]["Enums"]["application_status"] | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "internship_applications_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internship_listings"
            referencedColumns: ["internship_id"]
          },
          {
            foreignKeyName: "internship_applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      internship_listings: {
        Row: {
          company_id: number
          created_at: string | null
          description: string | null
          duration_weeks: number | null
          end_date: string | null
          internship_id: number
          is_active: boolean | null
          min_gpa_required: number | null
          posted_by_coordinator_id: number | null
          start_date: string | null
          stipend: string | null
          title: string
        }
        Insert: {
          company_id: number
          created_at?: string | null
          description?: string | null
          duration_weeks?: number | null
          end_date?: string | null
          internship_id?: number
          is_active?: boolean | null
          min_gpa_required?: number | null
          posted_by_coordinator_id?: number | null
          start_date?: string | null
          stipend?: string | null
          title: string
        }
        Update: {
          company_id?: number
          created_at?: string | null
          description?: string | null
          duration_weeks?: number | null
          end_date?: string | null
          internship_id?: number
          is_active?: boolean | null
          min_gpa_required?: number | null
          posted_by_coordinator_id?: number | null
          start_date?: string | null
          stipend?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "internship_listings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "internship_listings_posted_by_coordinator_id_fkey"
            columns: ["posted_by_coordinator_id"]
            isOneToOne: false
            referencedRelation: "cell_coordinators"
            referencedColumns: ["coordinator_id"]
          },
        ]
      }
      internship_offers: {
        Row: {
          acceptance_status: Database["public"]["Enums"]["offer_status"] | null
          internship_id: number
          offer_date: string
          offer_id: number
          student_id: string
        }
        Insert: {
          acceptance_status?: Database["public"]["Enums"]["offer_status"] | null
          internship_id: number
          offer_date: string
          offer_id?: number
          student_id: string
        }
        Update: {
          acceptance_status?: Database["public"]["Enums"]["offer_status"] | null
          internship_id?: number
          offer_date?: string
          offer_id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "internship_offers_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internship_listings"
            referencedColumns: ["internship_id"]
          },
          {
            foreignKeyName: "internship_offers_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      internship_required_skills: {
        Row: {
          internship_id: number
          is_mandatory: boolean | null
          skill_id: number
        }
        Insert: {
          internship_id: number
          is_mandatory?: boolean | null
          skill_id: number
        }
        Update: {
          internship_id?: number
          is_mandatory?: boolean | null
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "internship_required_skills_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internship_listings"
            referencedColumns: ["internship_id"]
          },
          {
            foreignKeyName: "internship_required_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["skill_id"]
          },
        ]
      }
      placement_applications: {
        Row: {
          application_date: string
          application_id: number
          placement_id: number
          status: Database["public"]["Enums"]["application_status"] | null
          student_id: string
        }
        Insert: {
          application_date?: string
          application_id?: number
          placement_id: number
          status?: Database["public"]["Enums"]["application_status"] | null
          student_id: string
        }
        Update: {
          application_date?: string
          application_id?: number
          placement_id?: number
          status?: Database["public"]["Enums"]["application_status"] | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "placement_applications_placement_id_fkey"
            columns: ["placement_id"]
            isOneToOne: false
            referencedRelation: "placement_listings"
            referencedColumns: ["placement_id"]
          },
          {
            foreignKeyName: "placement_applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      placement_listings: {
        Row: {
          company_id: number
          created_at: string | null
          date_posted: string
          description: string | null
          is_active: boolean | null
          job_title: string
          location: string | null
          min_gpa_required: number | null
          placement_id: number
          posted_by_coordinator_id: number | null
          salary_package: string | null
        }
        Insert: {
          company_id: number
          created_at?: string | null
          date_posted: string
          description?: string | null
          is_active?: boolean | null
          job_title: string
          location?: string | null
          min_gpa_required?: number | null
          placement_id?: number
          posted_by_coordinator_id?: number | null
          salary_package?: string | null
        }
        Update: {
          company_id?: number
          created_at?: string | null
          date_posted?: string
          description?: string | null
          is_active?: boolean | null
          job_title?: string
          location?: string | null
          min_gpa_required?: number | null
          placement_id?: number
          posted_by_coordinator_id?: number | null
          salary_package?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "placement_listings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "placement_listings_posted_by_coordinator_id_fkey"
            columns: ["posted_by_coordinator_id"]
            isOneToOne: false
            referencedRelation: "cell_coordinators"
            referencedColumns: ["coordinator_id"]
          },
        ]
      }
      placement_offers: {
        Row: {
          acceptance_status: Database["public"]["Enums"]["offer_status"] | null
          offer_date: string
          offer_id: number
          placement_id: number
          student_id: string
        }
        Insert: {
          acceptance_status?: Database["public"]["Enums"]["offer_status"] | null
          offer_date: string
          offer_id?: number
          placement_id: number
          student_id: string
        }
        Update: {
          acceptance_status?: Database["public"]["Enums"]["offer_status"] | null
          offer_date?: string
          offer_id?: number
          placement_id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "placement_offers_placement_id_fkey"
            columns: ["placement_id"]
            isOneToOne: false
            referencedRelation: "placement_listings"
            referencedColumns: ["placement_id"]
          },
          {
            foreignKeyName: "placement_offers_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      placement_required_skills: {
        Row: {
          is_mandatory: boolean | null
          placement_id: number
          skill_id: number
        }
        Insert: {
          is_mandatory?: boolean | null
          placement_id: number
          skill_id: number
        }
        Update: {
          is_mandatory?: boolean | null
          placement_id?: number
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "placement_required_skills_placement_id_fkey"
            columns: ["placement_id"]
            isOneToOne: false
            referencedRelation: "placement_listings"
            referencedColumns: ["placement_id"]
          },
          {
            foreignKeyName: "placement_required_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["skill_id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string | null
          skill_id: number
          skill_name: string
        }
        Insert: {
          category?: string | null
          skill_id?: number
          skill_name: string
        }
        Update: {
          category?: string | null
          skill_id?: number
          skill_name?: string
        }
        Relationships: []
      }
      student_documents: {
        Row: {
          document_id: number
          document_type: Database["public"]["Enums"]["document_type"]
          file_path: string
          storage_type: Database["public"]["Enums"]["storage_type"] | null
          student_id: string
          upload_date: string
        }
        Insert: {
          document_id?: number
          document_type: Database["public"]["Enums"]["document_type"]
          file_path: string
          storage_type?: Database["public"]["Enums"]["storage_type"] | null
          student_id: string
          upload_date?: string
        }
        Update: {
          document_id?: number
          document_type?: Database["public"]["Enums"]["document_type"]
          file_path?: string
          storage_type?: Database["public"]["Enums"]["storage_type"] | null
          student_id?: string
          upload_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_documents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      student_skills: {
        Row: {
          proficiency_level: Database["public"]["Enums"]["proficiency_level"]
          skill_id: number
          student_id: string
        }
        Insert: {
          proficiency_level: Database["public"]["Enums"]["proficiency_level"]
          skill_id: number
          student_id: string
        }
        Update: {
          proficiency_level?: Database["public"]["Enums"]["proficiency_level"]
          skill_id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["skill_id"]
          },
          {
            foreignKeyName: "student_skills_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          gpa: number | null
          graduation_year: number
          last_name: string
          major: string
          phone_number: string | null
          student_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          gpa?: number | null
          graduation_year: number
          last_name: string
          major: string
          phone_number?: string | null
          student_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          gpa?: number | null
          graduation_year?: number
          last_name?: string
          major?: string
          phone_number?: string | null
          student_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "recruiter" | "admin"
      application_status:
        | "Pending"
        | "Reviewed"
        | "Interviewing"
        | "Offered"
        | "Rejected"
        | "Withdrawn"
      coordinator_role: "Admin" | "Student Coordinator" | "Company Liaison"
      document_type: "Resume" | "Transcript" | "ID Proof" | "Certificates"
      gender_type: "Male" | "Female" | "Other"
      offer_status: "Pending" | "Accepted" | "Rejected"
      proficiency_level: "Beginner" | "Intermediate" | "Expert"
      storage_type: "Local" | "Cloud"
      user_type: "Student" | "Coordinator" | "System"
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
    Enums: {
      app_role: ["student", "recruiter", "admin"],
      application_status: [
        "Pending",
        "Reviewed",
        "Interviewing",
        "Offered",
        "Rejected",
        "Withdrawn",
      ],
      coordinator_role: ["Admin", "Student Coordinator", "Company Liaison"],
      document_type: ["Resume", "Transcript", "ID Proof", "Certificates"],
      gender_type: ["Male", "Female", "Other"],
      offer_status: ["Pending", "Accepted", "Rejected"],
      proficiency_level: ["Beginner", "Intermediate", "Expert"],
      storage_type: ["Local", "Cloud"],
      user_type: ["Student", "Coordinator", "System"],
    },
  },
} as const
