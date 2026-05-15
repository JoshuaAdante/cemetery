export interface Cemetery {
  id: string
  name: string
  description: string
  address: string
  city: string
  type: 'public' | 'private' | 'memorial_park'
  latitude: number
  longitude: number
  total_plots: number
  available_plots: number
  starting_price: number
  image_url: string
  is_active: boolean
  created_at: string
}

export interface Plot {
  id: string
  cemetery_id: string
  plot_number: string
  section: string
  garden: string
  plot_type: string
  price: number
  status: 'available' | 'reserved' | 'occupied'
  description: string
  features: string[]
  created_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  category: string
  icon: string
  is_active: boolean
}

export interface Booking {
  id: string
  user_id: string
  cemetery_id: string
  plot_id: string
  deceased_name: string
  deceased_date_of_passing: string
  special_requests: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  total_amount: number
  downpayment_amount: number
  payment_method: string
  payment_status: 'unpaid' | 'partial' | 'paid'
  created_at: string
  updated_at: string
  cemetery?: Cemetery
  plot?: Plot
  services?: Service[]
}

export interface Profile {
  id: string
  full_name: string
  phone_number: string
  avatar_url: string
  created_at: string
  updated_at: string
}

export interface MemorialRecord {
  id: string
  user_id: string
  name: string
  birth_year: number
  death_year: number
  epitaph: string
  relationship: string
  image_url: string
  booking_id: string
  created_at: string
}

export type BookingStep = 1 | 2 | 3 | 4
