import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { StarsBackground } from '@/components/ui/stars-background'
import { UserProfile, UpdateProfileRequest } from '@/types/user'
import { Loader2, Camera } from 'lucide-react'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000'

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Load user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          window.location.href = '/'
          return
        }

        const res = await fetch(`${API_URL}/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (!res.ok) throw new Error('Failed to fetch profile')
        
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        setError('Failed to load profile')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview the selected image
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setImageFile(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No auth token')

      // Upload image if selected
      let avatarUrl = profile?.avatarUrl
      if (imageFile) {
        const formData = new FormData()
        formData.append('avatar', imageFile)
        
        const uploadRes = await fetch(`${API_URL}/user/avatar`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })
        
        if (!uploadRes.ok) throw new Error('Failed to upload avatar')
        const { avatarUrl: newAvatarUrl } = await uploadRes.json()
        avatarUrl = newAvatarUrl
      }

      // Get form data
      const formData = new FormData(e.currentTarget)
      const updates: UpdateProfileRequest = {
        name: formData.get('name') as string,
        title: formData.get('title') as string,
        company: formData.get('company') as string,
        bio: formData.get('bio') as string,
        phone: formData.get('phone') as string,
        location: formData.get('location') as string,
        timezone: formData.get('timezone') as string
      }

      // Update profile
      const res = await fetch(`${API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })

      if (!res.ok) throw new Error('Failed to update profile')

      const updatedProfile = await res.json()
      setProfile(updatedProfile)
      setImageFile(null)
      setImagePreview(null)

    } catch (err) {
      console.error('Profile update error:', err)
      setError('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <StarsBackground className="!fixed" />
      <h1 className="relative mb-8 text-2xl font-semibold">Profile Settings</h1>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Avatar upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-white/10 bg-black">
                {(imagePreview || profile?.avatarUrl) ? (
                  <img 
                    src={imagePreview || profile?.avatarUrl} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/5 text-2xl text-primary/40">
                    {profile?.name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <label 
                htmlFor="avatar" 
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-black shadow-lg transition-transform hover:scale-110"
              >
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Name
              </label>
              <input
                name="name"
                defaultValue={profile?.name}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:border-primary focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Job Title
              </label>
              <input
                name="title"
                defaultValue={profile?.title}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:border-primary focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Company
              </label>
              <input
                name="company"
                defaultValue={profile?.company}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:border-primary focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={profile?.bio}
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:border-primary focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                defaultValue={profile?.phone}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:border-primary focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Location
              </label>
              <input
                name="location"
                defaultValue={profile?.location}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:border-primary focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Timezone
              </label>
              <select
                name="timezone"
                defaultValue={profile?.timezone}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:border-primary focus:ring-1"
              >
                <option value="">Select timezone...</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">UTC</option>
                <option value="UTC+1">Central European Time (UTC+1)</option>
                <option value="UTC+2">Eastern European Time (UTC+2)</option>
                <option value="UTC+5:30">India Standard Time (UTC+5:30)</option>
                <option value="UTC+8">China Standard Time (UTC+8)</option>
                <option value="UTC+9">Japan Standard Time (UTC+9)</option>
              </select>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400"
            >
              {error}
            </motion.div>
          )}

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={saving}
              className="px-8"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}