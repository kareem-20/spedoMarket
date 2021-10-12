export interface Address {
  _id?: string,
  position?: {
    lat: number,
    lng: number
  },
  title?: string,
  city?: string,
  userId?: string,
  zone?: string,
  street?: string,
  mark?: string,
  checked?: boolean
}
