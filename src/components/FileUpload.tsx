'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Upload, File, Image, FileText, X, CheckCircle } from 'lucide-react'

interface FileUploadProps {
  onFileUploaded?: (file: UploadedFile) => void
  maxFiles?: number
  maxSize?: number // in MB
  acceptedTypes?: string[]
  projectId?: string
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}

interface FileWithProgress {
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
  id: string
}

export function FileUpload({
  onFileUploaded,
  maxFiles = 10,
  maxSize = 10,
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'],
  projectId
}: FileUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<FileWithProgress[]>([])
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="w-6 h-6 text-blue-600" />
    }
    if (fileType.includes('pdf')) {
      return <FileText className="w-6 h-6 text-red-600" />
    }
    if (fileType.includes('doc') || fileType.includes('word')) {
      return <FileText className="w-6 h-6 text-blue-700" />
    }
    if (fileType.includes('sheet') || fileType.includes('excel')) {
      return <File className="w-6 h-6 text-green-600" />
    }
    return <File className="w-6 h-6 text-gray-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  }

  const validateFile = (file: File) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `Το αρχείο είναι πολύ μεγάλο. Μέγιστο μέγεθος: ${maxSize}MB`
    }

    // Check file type
    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      return file.type.match(type.replace('*', '.*'))
    })

    if (!isValidType) {
      return 'Μη υποστηριζόμενος τύπος αρχείου'
    }

    return null
  }

  const simulateUpload = (fileWithProgress: FileWithProgress) => {
    const interval = setInterval(() => {
      setUploadingFiles(prev => prev.map(f => {
        if (f.id === fileWithProgress.id) {
          const newProgress = Math.min(f.progress + Math.random() * 15 + 5, 100)

          if (newProgress >= 100) {
            clearInterval(interval)

            // Simulate successful upload
            setTimeout(() => {
              const uploadedFile: UploadedFile = {
                id: f.id,
                name: f.file.name,
                size: f.file.size,
                type: f.file.type,
                url: URL.createObjectURL(f.file), // In real app, this would be the server URL
                uploadedAt: new Date()
              }

              if (onFileUploaded) {
                onFileUploaded(uploadedFile)
              }

              setUploadingFiles(prev => prev.map(file =>
                file.id === f.id ? { ...file, status: 'completed' as const } : file
              ))

              // Remove from uploading list after 2 seconds
              setTimeout(() => {
                setUploadingFiles(prev => prev.filter(file => file.id !== f.id))
              }, 2000)
            }, 500)

            return { ...f, progress: 100, status: 'completed' as const }
          }

          return { ...f, progress: newProgress }
        }
        return f
      }))
    }, 200)
  }

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files)

    // Check max files limit
    if (uploadingFiles.length + fileArray.length > maxFiles) {
      alert(`Μπορείτε να ανεβάσετε μέχρι ${maxFiles} αρχεία`)
      return
    }

    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        alert(`${file.name}: ${error}`)
        continue
      }

      const fileWithProgress: FileWithProgress = {
        file,
        progress: 0,
        status: 'uploading',
        id: `${Date.now()}-${Math.random()}`
      }

      setUploadingFiles(prev => [...prev, fileWithProgress])
      simulateUpload(fileWithProgress)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files?.[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files?.[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (fileId: string) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== fileId))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Ανέβασμα Αρχείων</span>
          </CardTitle>
          <CardDescription>
            Σύρετε τα αρχεία εδώ ή κάντε κλικ για επιλογή. Μέγιστο μέγεθος: {maxSize}MB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                Σύρετε τα αρχεία εδώ
              </p>
              <p className="text-gray-600">
                ή
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
              >
                Επιλέξτε Αρχεία
              </Button>
            </div>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Accepted file types */}
          <div className="mt-4 text-sm text-gray-500">
            <p className="font-medium mb-2">Υποστηριζόμενοι τύποι αρχείων:</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Εικόνες (JPG, PNG, GIF)</Badge>
              <Badge variant="outline">PDF</Badge>
              <Badge variant="outline">Word (DOC, DOCX)</Badge>
              <Badge variant="outline">Excel (XLS, XLSX)</Badge>
              <Badge variant="outline">PowerPoint (PPT, PPTX)</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ανέβασμα σε εξέλιξη</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadingFiles.map((fileWithProgress) => (
              <div key={fileWithProgress.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {getFileIcon(fileWithProgress.file.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {fileWithProgress.file.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      {fileWithProgress.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                      <button
                        onClick={() => removeFile(fileWithProgress.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{formatFileSize(fileWithProgress.file.size)}</span>
                    <span>
                      {fileWithProgress.status === 'completed' ? 'Ολοκληρώθηκε' :
                       `${Math.round(fileWithProgress.progress)}%`}
                    </span>
                  </div>

                  <Progress
                    value={fileWithProgress.progress}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
