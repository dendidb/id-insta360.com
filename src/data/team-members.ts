export interface TeamMember {
  id: string;
  name: string;
  image: string;
  category: string;
  bio?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "marc-marquez",
    name: "Marc Márquez",
    image: "/images/marc-marquez.png",
    category: "motorsport",
    bio: "MotoGP World Champion and legend of modern motorcycle racing.",
    instagram: "https://www.instagram.com/marcmarquez93/",
  },
  {
    id: "fabio-widmer",
    name: "Fabio Widmer",
    image: "/images/fabio-widmer.png",
    category: "winter-sports",
    bio: "Professional snowboarder and freeride specialist from Switzerland.",
    instagram: "https://www.instagram.com/fabiowidmer/",
  },
  {
    id: "jonathan-rea",
    name: "Jonathan Rea",
    image: "/images/jonathan-rea.png",
    category: "motorsport",
    bio: "WorldSBK multiple champion and one of the greatest superbike racers of all time.",
    instagram: "https://www.instagram.com/jonathanrea/",
  },
  {
    id: "zhang-shupeng",
    name: "Zhang Shupeng",
    image: "/images/shupeng-zhang.png",
    category: "aerial",
    bio: "World champion wingsuit athlete and extreme sports pioneer from China.",
    instagram: "https://www.instagram.com/zhang_shupeng/",
  },
  {
    id: "cache-bunny",
    name: "Cache Bunny",
    image: "/images/cache-bunny.png",
    category: "lifestyle",
    bio: "Creative content creator known for vibrant and unique style.",
    instagram: "https://www.instagram.com/cachebunny/",
  },
  {
    id: "okamoto-keiji",
    name: "Okamoto Keiji",
    image: "/images/okamoto-keiji.png",
    category: "winter-sports",
    bio: "Professional snowboarder from Japan with exceptional freestyle skills.",
    instagram: "https://www.instagram.com/okamotokeiji/",
  },
  {
    id: "brad-simms",
    name: "Brad Simms",
    image: "/images/brad-simms.png",
    category: "cycling",
    bio: "Professional BMX rider known for his incredible street style and technical tricks.",
    instagram: "https://www.instagram.com/bradsimms/",
  },
  {
    id: "anne-gumiran",
    name: "Anne Gumiran",
    image: "/images/anne-gumiran.png",
    category: "lifestyle",
    bio: "Photographer and content creator focusing on travel and adventure photography.",
    instagram: "https://www.instagram.com/annegumiran/",
  }
]; 