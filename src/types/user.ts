export interface UserProfile {
  id: string
  name: string
  email: string
  title?: string
  company?: string
  bio?: string
  avatarUrl?: string
  phone?: string
  location?: string
  timezone?: string
  lastUpdated?: string
}

export interface UpdateProfileRequest {
  name?: string
  title?: string
  company?: string
  bio?: string
  phone?: string
  location?: string
  timezone?: string
}

export interface UploadAvatarResponse {
  avatarUrl: string
}