import { useEffect, useState, useRef } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Toast } from '@/components/ui/toast'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { 
  TrendingUp, 
  Flame, 
  Timer, 
  Brain,
  FileSpreadsheet,
  FileText,
  Trash2,
  Play,
  LogOut,
  Image as ImageIcon,
  Stethoscope
} from 'lucide-react'
import { ConfirmModal } from '@/components/ui/confirm-modal'

type FileType = 'report' | 'imaging' | 'labs'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000'

interface UploadedFile {
  id: string
  name: string
  type: FileType
  date: string
}

// Sample data for metrics
const metrics = [
  { 
    label: 'Cases Analyzed',
    value: '245',
    change: '+12 today',
    icon: Brain,
    trend: 'up'
  },
  {
    label: 'Urgent Cases',
    value: '3',
    change: '-2 from yesterday',
    icon: Flame,
    trend: 'down'
  },
  {
    label: 'Avg Response Time',
    value: '2.5 min',
    change: '-30s',
    icon: Timer,
    trend: 'up'
  },
  {
    label: 'Confidence Score',
    value: '94.2%',
    change: '+1.5%',
    icon: TrendingUp,
    trend: 'up'
  }
]

interface PatientRecord {
  id: string
  name: string
  type: FileType
  date: string
}

export const Dashboard: React.FC = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { user, loading, signOut } = useAuth()
  const { show } = useToast()

  // Loading state is now handled by PrivateRoute

  // Handle initiating logout
  const initiateLogout = () => {
    setShowLogoutConfirm(true)
  }

  // Handle confirmed logout
  const handleLogout = async () => {
    // Close confirmation modal
    setShowLogoutConfirm(false)
    
    try {
      await signOut()
      show('Logged out successfully', 'success')
      
      // Redirect to landing page
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } catch (err) {
      console.error('Logout error:', err)
      show('Error logging out', 'error')
    }
  }

  const [uploadedFiles, setUploadedFiles] = useState<PatientRecord[]>([
    { id: '1', name: 'Patient-History-Report.pdf', type: 'report', date: '2025-09-15' },
    { id: '2', name: 'Lab-Results-Panel.pdf', type: 'labs', date: '2025-09-14' }
  ])

  const [isUploading, setIsUploading] = useState(false)
  const [isDiagnosing, setIsDiagnosing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (type: FileType) => {
    // Open file dialog
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    show('Starting upload...', 'info')

    try {
      // TODO: Replace with actual API call
      // const formData = new FormData()
      // formData.append('file', file)
      // const response = await fetch(`${API_URL}/upload`, {
      //   method: 'POST',
      //   body: formData,
      // })
      
      // Temporary simulation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newFile: PatientRecord = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        type: 'report',
        date: new Date().toISOString().split('T')[0]
      }
      
      setUploadedFiles([newFile, ...uploadedFiles])
      show('File uploaded successfully!', 'success')
    } catch (error) {
      console.error('Upload error:', error)
      show('Failed to upload file', 'error')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`${API_URL}/files/${id}`, {
      //   method: 'DELETE',
      // })
      
      setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
      show('File deleted successfully', 'success')
    } catch (error) {
      console.error('Delete error:', error)
      show('Failed to delete file', 'error')
    }
  }

  const handleRunDiagnostic = async () => {
    if (uploadedFiles.length === 0) {
      show('Please upload files first', 'error')
      return
    }

    setIsDiagnosing(true)
    show('Starting diagnostic analysis...', 'info')

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_URL}/analyze`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     fileIds: uploadedFiles.map(f => f.id)
      //   }),
      // })

      // Temporary simulation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      show('Analysis completed successfully!', 'success')
    } catch (error) {
      console.error('Analysis error:', error)
      show('Failed to complete analysis', 'error')
    } finally {
      setIsDiagnosing(false)
    }
  }

  return (
    <DashboardLayout>
      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out? You will need to log in again to access your dashboard."
        confirmText="Yes, Log Out"
        cancelText="Cancel"
      />

      {/* Toast Notifications are now handled by ToastContext */}
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-lg bg-primary/20 p-2 sm:p-3 text-primary">
                <metric.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/60">{metric.label}</p>
                <p className="text-xl sm:text-2xl font-semibold text-white">{metric.value}</p>
                <p className={cn(
                  "text-xs sm:text-sm",
                  metric.trend === 'up' ? "text-green-500" : "text-red-500"
                )}>
                  {metric.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload and Analysis Grid */}
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Upload Medical Records</h2>
          <p className="mt-1 text-sm text-white/60">
            Upload medical reports and scans for AI diagnosis
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelected}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.dicom"
            />
            <Button
              onClick={() => handleFileUpload('imaging')}
              className="flex-1 sm:flex-none gap-2 px-3 sm:px-4"
              disabled={isUploading}
            >
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
              <span className="sm:hidden">Image</span>
            </Button>
            <Button
              onClick={() => handleFileUpload('report')}
              className="flex-1 sm:flex-none gap-2 px-3 sm:px-4"
              disabled={isUploading}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Upload Report'}</span>
              <span className="sm:hidden">Report</span>
            </Button>
            <Button
              onClick={() => handleFileUpload('labs')}
              className="flex-1 sm:flex-none gap-2 px-3 sm:px-4"
              disabled={isUploading}
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Upload Labs'}</span>
              <span className="sm:hidden">Labs</span>
            </Button>
          </div>

          {/* Files List */}
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 sm:px-4 sm:py-3"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  {file.type === 'imaging' ? (
                    <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  ) : file.type === 'labs' ? (
                    <FileSpreadsheet className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  ) : (
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-white truncate">{file.name}</p>
                    <p className="text-xs text-white/60 truncate">Uploaded on {file.date}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(file.id)}
                  className="ml-2 text-white/60 hover:text-red-500 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Section */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">AI Diagnostic Analysis</h2>
          <p className="mt-1 text-sm text-white/60">
            Get AI-powered analysis of your medical records
          </p>

          <div className="mt-6 h-[300px] rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/60">
              Upload your medical records and scans to get AI-powered diagnostic insights.
              Our system will analyze your records and provide:
              <br /><br />
              • Pattern recognition in medical images<br />
              • Symptom analysis and correlation<br />
              • Risk assessment and early warnings<br />
              • Treatment suggestions and recommendations
            </p>
          </div>

          <div className="mt-6">
            <Button 
              className="gap-2"
              onClick={handleRunDiagnostic}
              disabled={isDiagnosing || uploadedFiles.length === 0}
            >
              <Stethoscope className="h-4 w-4" />
              {isDiagnosing ? 'Analyzing...' : 'Run Diagnostic'}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}



