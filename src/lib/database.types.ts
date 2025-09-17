export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string
          avatar_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          name?: string | null
          email?: string
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}