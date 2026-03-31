export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          company_id: string | null;
          name: string | null;
          name_ar: string | null;
          passport: string | null;
          job_title: string | null;
          job_title_ar: string | null;
          image_url: string | null;
          created_at: string;
          municipal: string | null;
          honesty: string | null;
          id_number: string | null;
          nationality: string | null;
          sex: string | null;
          occupation: string | null;
          health_cert_number: string | null;
          health_cert_expiry: string | null;
          health_cert_issue_hijri: string | null;
          health_cert_issue_gregorian: string | null;
          edu_program_end: string | null;
          edu_program_end_gregorian: string | null;
          edu_program_type: string | null;
          facility_name: string | null;
          license_number: string | null;
          facility_number: string | null;
        };
        Insert: {
          id?: string;
          company_id?: string | null;
          name?: string | null;
          name_ar?: string | null;
          passport?: string | null;
          job_title?: string | null;
          job_title_ar?: string | null;
          image_url?: string | null;
          created_at?: string;
          municipal?: string | null;
          honesty?: string | null;
          id_number?: string | null;
          nationality?: string | null;
          sex?: string | null;
          occupation?: string | null;
          health_cert_number?: string | null;
          health_cert_expiry?: string | null;
          health_cert_issue_hijri?: string | null;
          health_cert_issue_gregorian?: string | null;
          edu_program_end?: string | null;
          edu_program_end_gregorian?: string | null;
          edu_program_type?: string | null;
          facility_name?: string | null;
          license_number?: string | null;
          facility_number?: string | null;
        };
        Update: {
          id?: string;
          company_id?: string | null;
          name?: string | null;
          name_ar?: string | null;
          passport?: string | null;
          job_title?: string | null;
          job_title_ar?: string | null;
          image_url?: string | null;
          created_at?: string;
          municipal?: string | null;
          honesty?: string | null;
          id_number?: string | null;
          nationality?: string | null;
          sex?: string | null;
          occupation?: string | null;
          health_cert_number?: string | null;
          health_cert_expiry?: string | null;
          health_cert_issue_hijri?: string | null;
          health_cert_issue_gregorian?: string | null;
          edu_program_end?: string | null;
          edu_program_end_gregorian?: string | null;
          edu_program_type?: string | null;
          facility_name?: string | null;
          license_number?: string | null;
          facility_number?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
