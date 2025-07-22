export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  department: string;
  location: string;
  bio: string;
  linkedin?: string;
  instagram?: string;
}

export interface TeamValue {
  title: string;
  description: string;
  icon: string;
} 