export interface Student {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | '' ;
  country: string;
  courses: string[]
}