export interface Patient {
  id: string
  name: string
  email: string
  phone: string
}

export interface Form {
  id: string
  title: string
  description: string
  createdAt: string
}

export interface SearchResponse<T> {
  content: T[]
  totalPages: number
  totalElements: number
}

export interface SelectedItems {
  patient: Patient | null
  form: Form | null
}

