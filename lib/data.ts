// ─── TYPES ────────────────────────────────────────────────────────────────────

export type FilmStatus = "active" | "pending" | "rejected";
export type CinemaStatus = "active" | "maintenance" | "inactive";
export type UserRole = "producer" | "cinema" | "admin";
export type NotifType = "success" | "info" | "warning";

export interface Film {
  id: number;
  title: string;
  genre: string;
  director: string;
  cast: string[];
  duration: string;
  language: string;
  synopsis: string;
  releaseDate: string;
  releaseType: string;
  status: FilmStatus;
  cinemaCount: number;
  color: string;
  accentColor: string;
  totalRevenue: number;
  totalTickets: number;
  weeklyData: number[];
  cities: Record<string, number>;
}

export interface Cinema {
  id: number;
  name: string;
  city: string;
  screens: number;
  capacity: number;
  status: CinemaStatus;
  revenue: number;
}

export interface Message {
  id: number;
  from: string;
  text: string;
  time: string;
  role: "support" | "user";
}

export interface Notification {
  id: number;
  type: NotifType;
  text: string;
  time: string;
}

export interface User {
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
}

// ─── DEMO DATA ────────────────────────────────────────────────────────────────

export const FILMS: Film[] = [
  {
    id: 1,
    title: "RED CIRCLE",
    genre: "Thriller",
    director: "Kunle Afolayan",
    cast: ["Ramsey Nouah", "Genevieve Nnaji", "Tobi Bakre"],
    duration: "118 min",
    language: "English / Yoruba",
    synopsis:
      "A former detective is pulled back into the criminal underworld when his daughter is kidnapped by a shadowy crime syndicate known only as The Red Circle.",
    releaseDate: "2024-03-15",
    releaseType: "Nationwide",
    status: "active",
    cinemaCount: 12,
    color: "#E63946",
    accentColor: "#FF6B6B",
    totalRevenue: 48750000,
    totalTickets: 87420,
    weeklyData: [12000, 18500, 22000, 19000, 24000, 28000, 31000],
    cities: {
      Lagos: 1200,
      Abuja: 850,
      "Port Harcourt": 420,
      Enugu: 310,
      Ibadan: 280,
    },
  },
  {
    id: 2,
    title: "LAGOS NIGHTS",
    genre: "Drama",
    director: "Kemi Adetiba",
    cast: ["Bimbo Ademoye", "Simi Drey", "Jide Kosoko"],
    duration: "134 min",
    language: "English / Igbo",
    synopsis:
      "Three strangers' lives intertwine over one extraordinary night in Lagos, revealing the city's soul — its struggles, its magic, and its unbreakable spirit.",
    releaseDate: "2024-04-05",
    releaseType: "Limited",
    status: "active",
    cinemaCount: 8,
    color: "#F4A261",
    accentColor: "#FFBA49",
    totalRevenue: 29340000,
    totalTickets: 52680,
    weeklyData: [8000, 11000, 14000, 12500, 15000, 17000, 19000],
    cities: {
      Lagos: 900,
      Abuja: 600,
      "Port Harcourt": 300,
      Ibadan: 220,
    },
  },
  {
    id: 3,
    title: "SHADOWS OF ABUJA",
    genre: "Action",
    director: "Moses Inwang",
    cast: ["Jim Iyke", "Chidi Mokeme", "Kate Henshaw"],
    duration: "105 min",
    language: "English",
    synopsis:
      "A special forces operative uncovers a conspiracy within the corridors of power in Abuja that threatens the stability of an entire nation.",
    releaseDate: "2024-04-22",
    releaseType: "Nationwide",
    status: "pending",
    cinemaCount: 6,
    color: "#2A9D8F",
    accentColor: "#48CAE4",
    totalRevenue: 18920000,
    totalTickets: 34050,
    weeklyData: [5000, 7000, 9000, 8500, 10000, 12000, 14000],
    cities: {
      Lagos: 700,
      Abuja: 950,
      "Port Harcourt": 200,
    },
  },
];

export const CINEMAS: Cinema[] = [
  {
    id: 1,
    name: "Nile Cinemas Ikota",
    city: "Lagos",
    screens: 8,
    capacity: 1200,
    status: "active",
    revenue: 18500000,
  },
  {
    id: 2,
    name: "Viva Cinemas Ikeja",
    city: "Lagos",
    screens: 6,
    capacity: 900,
    status: "active",
    revenue: 14200000,
  },
  {
    id: 3,
    name: "Genesis Cinemas Lekki",
    city: "Lagos",
    screens: 5,
    capacity: 750,
    status: "active",
    revenue: 11800000,
  },
  {
    id: 4,
    name: "Silverbird Cinemas Abuja",
    city: "Abuja",
    screens: 7,
    capacity: 1050,
    status: "active",
    revenue: 16400000,
  },
  {
    id: 5,
    name: "Kada Cinemas Abuja",
    city: "Abuja",
    screens: 4,
    capacity: 600,
    status: "active",
    revenue: 9200000,
  },
  {
    id: 6,
    name: "Genesis Cinemas PH",
    city: "Port Harcourt",
    screens: 5,
    capacity: 750,
    status: "active",
    revenue: 8700000,
  },
  {
    id: 7,
    name: "Filmhouse Enugu",
    city: "Enugu",
    screens: 3,
    capacity: 450,
    status: "active",
    revenue: 5400000,
  },
  {
    id: 8,
    name: "Odeon Ibadan",
    city: "Ibadan",
    screens: 4,
    capacity: 600,
    status: "active",
    revenue: 6100000,
  },
  {
    id: 9,
    name: "Rex Cinemas Benin",
    city: "Benin",
    screens: 3,
    capacity: 400,
    status: "maintenance",
    revenue: 3200000,
  },
  {
    id: 10,
    name: "Miramax Calabar",
    city: "Calabar",
    screens: 2,
    capacity: 300,
    status: "active",
    revenue: 2800000,
  },
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    from: "Support",
    text: "Welcome to Nile Distribution Platform! How can we help you today?",
    time: "10:00 AM",
    role: "support",
  },
  {
    id: 2,
    from: "You",
    text: "Hi, I need help scheduling a new release for RED CIRCLE.",
    time: "10:02 AM",
    role: "user",
  },
  {
    id: 3,
    from: "Support",
    text: "Sure! RED CIRCLE is currently showing in 12 cinemas nationwide. Would you like to expand to additional locations?",
    time: "10:03 AM",
    role: "support",
  },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "success",
    text: "RED CIRCLE approved for nationwide release",
    time: "2h ago",
  },
  {
    id: 2,
    type: "info",
    text: "Lagos Nights surpassed 50,000 ticket sales",
    time: "4h ago",
  },
  {
    id: 3,
    type: "warning",
    text: "Shadows of Abuja pending admin review",
    time: "1d ago",
  },
  {
    id: 4,
    type: "info",
    text: "New cinema added: Miramax Calabar",
    time: "2d ago",
  },
];

export const USERS: Record<UserRole, User> = {
  producer: {
    name: "Emeka Okafor",
    role: "producer",
    email: "emeka@ndp.com",
    avatar: "EO",
  },
  cinema: {
    name: "Amina Bello",
    role: "cinema",
    email: "amina@ndp.com",
    avatar: "AB",
  },
  admin: {
    name: "Chukwudi Eze",
    role: "admin",
    email: "chukwudi@ndp.com",
    avatar: "CE",
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export const formatNaira = (n: number): string =>
  `₦${(n / 1000000).toFixed(1)}M`;

export const formatNum = (n: number): string => n.toLocaleString();

export const ROLE_COLORS: Record<UserRole, string> = {
  producer: "#E63946",
  cinema: "#F4A261",
  admin: "#2A9D8F",
};

export const GENRE_ICONS: Record<string, string> = {
  Thriller: "🎯",
  Drama: "🌙",
  Action: "⚡",
  Comedy: "😄",
  Romance: "❤️",
  Horror: "👻",
};
