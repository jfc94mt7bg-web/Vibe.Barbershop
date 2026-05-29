import { Barber, BarberId, CustomerReview, Service, ServiceCategory } from "./types";

export const BARBERS: Barber[] = [
  {
    id: BarberId.Ilya,
    name: "Ilya",
    role: "Master Barber / Fade Specialist",
    rating: 4.93,
    reviewsCount: 164,
    bio: "Hailed as one of the best barbers in Batumi, Ilya focuses on ultra-precise skin fades and impeccable hair shapes. He crafts a relaxed, chill experience with perfect attention to detail.",
    specialty: "Precision Skins Fades, Scissor Cuts, Texturizing",
    avatarSeed: "Ilya"
  },
  {
    id: BarberId.Katerina,
    name: "Katerina (Katia)",
    role: "Senior Barber / Master Beard Stylist",
    rating: 4.97,
    reviewsCount: 142,
    bio: "An exceptionally experienced master who specializes in bespoke beard grooming, razor sharp line work, and traditional hot towel shave therapies. Loved by clients who are highly particular about their beard designs.",
    specialty: "Luxury Beard Shaves, Hot Towel Therapy, Straight-Razor Lineups",
    avatarSeed: "Katerina"
  },
  {
    id: BarberId.Vlad,
    name: "Vlad",
    role: "Pro Barber / Styling Advisor",
    rating: 4.89,
    reviewsCount: 128,
    bio: "Vlad is widely appreciated for being highly efficient, incredibly friendly, and offering excellent hair styling suggestions. He does his job fast without ever sacrificing quality.",
    specialty: "Modern Casual Styles, Style Consultations, Quick Clean-ups",
    avatarSeed: "Vlad"
  }
];

export const SERVICES: Service[] = [
  {
    id: "classic-haircut",
    name: "Classic Haircut & Styling",
    durationMin: 45,
    priceGEL: 50,
    priceUSD: 19,
    description: "Premium tailored haircut with full scissor and clipper work, hair wash, relaxing scalp massage, and natural products styling.",
    category: ServiceCategory.Hair,
    iconName: "Scissors"
  },
  {
    id: "signature-fade",
    name: "Signature Skin Fade",
    durationMin: 50,
    priceGEL: 60,
    priceUSD: 23,
    description: "A flawless, masterfully blended skin fade (high, mid, or low drop) including hair wash, blow dryer style, and neck tape cleanup.",
    category: ServiceCategory.Hair,
    iconName: "Sparkles"
  },
  {
    id: "beard-grooming",
    name: "Premium Beard Shaping & Hot Towel",
    durationMin: 35,
    priceGEL: 40,
    priceUSD: 15,
    description: "Personalized beard trim formatted to your facial architecture. Includes beard wash, razor outline finish, and rich hot oil styling balm.",
    category: ServiceCategory.Beard,
    iconName: "Smile"
  },
  {
    id: "royal-combo",
    name: "The Full VIBE Package (Combo)",
    durationMin: 80,
    priceGEL: 90,
    priceUSD: 34,
    description: "Our signature offer. Royal haircut of your choice combined with a pristine premium beard trim, warm vapor hot towel treatment, mini face massage, and a complimentary premium beverage.",
    category: ServiceCategory.Combo,
    iconName: "Crown"
  },
  {
    id: "buzz-cut",
    name: "Buzz Cut & Refresh",
    durationMin: 25,
    priceGEL: 30,
    priceUSD: 11,
    description: "Minimalist, high-symmetry uniform clipper cut using multi-guard techniques, finished with an refreshing wash and clean outlines.",
    category: ServiceCategory.Hair,
    iconName: "Zap"
  },
  {
    id: "beard-beard-only",
    name: "Quick Beard Outline & Care",
    durationMin: 20,
    priceGEL: 25,
    priceUSD: 10,
    description: "A fast touch-up for the mustache and cheek lines, utilizing standard single-razor shapeups and hydrating oils.",
    category: ServiceCategory.Beard,
    iconName: "Flame"
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "review-1",
    author: "Iaroslav",
    rating: 5,
    reviewsCount: 7,
    text: "Ilya is hands down one of the best barbers in Batumi. Super precise with the fade, always gets the shape just right, and makes the whole experience comfortable and chill. You can tell he takes pride in his work, the attention to detail is remarkable.",
    relativeTime: "10 months ago",
    ownerResponse: "💈😎",
    hasPhoto: true
  },
  {
    id: "review-2",
    author: "Tauseeq Ashraf",
    rating: 5,
    reviewsCount: 3,
    text: "I visited yesterday for a beard trim, and I had the pleasure of being styled by Katia (Katerina). She is simply amazing! I’m very particular about my beard, and honestly, only one in a hundred barbers can get it right for me, but she did an absolute masterpiece.",
    relativeTime: "a year ago",
    ownerResponse: "It's a pleasure to work with you. Come again!!!",
    hasPhoto: true
  },
  {
    id: "review-3",
    author: "Oleg Semenovsky",
    rating: 5,
    reviewsCount: 4,
    text: "Very well equipped and well staffed barbershop. Specifically Vlad is a very likeable and efficient barber. Did his job well, fast and offered good suggestions.",
    relativeTime: "3 months ago",
    ownerResponse: "Thank you very much for your kind review! We're happy to hear you enjoyed the barbershop and Vlad’s work. We'll be sure to pass your words on to him. Hope to see you again at Vibe Barbershop!",
    hasPhoto: false
  },
  {
    id: "review-4",
    author: "Jean-Baptiste Lavollay",
    rating: 5,
    reviewsCount: 6,
    text: "Great experience at VIBE barbershop! Ilya did a great job and created a very friendly atmosphere. I strongly recommend if you are in the region.",
    relativeTime: "9 months ago",
    ownerResponse: "🙌",
    hasPhoto: false
  },
  {
    id: "review-5",
    author: "Aleksandre Bregvadze",
    rating: 5,
    reviewsCount: 21,
    text: "I don't usually write reviews, but this is an exception because you can only get a real barbershop experience here.",
    relativeTime: "a year ago",
    ownerResponse: "Thank you for your review! We're so glad our experienced hairdresser, Katerina, left such a wonderful impression on you. We always strive to provide our clients with the highest level of service and quality. We look forward to seeing you again in our salon the next time!",
    hasPhoto: true
  }
];

export const GENERAL_FAQ = [
  {
    question: "Do you accept walk-ins, or should I book in advance?",
    answer: "While we do accept walk-ins depending on immediate seat vacancies, we strongly recommend booking in advance. Our master barbers Ilya, Vlad, and Katerina tend to book out several days ahead, especially on weekends and evenings."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We understand that plans can change. We kindly request that you cancel or reschedule your booking at least 2 hours before your appointment. This allows other clients on our waiting list to take the slot."
  },
  {
    question: "Which currencies do you accept at the barbershop in Batumi?",
    answer: "We accept Georgian Lari (GEL) in cash, as well as electronic terminal payments with major international Visa / MasterCard credit cards. For our international travelers, prices are displayed in both GEL (₾) and USD ($) for transparency."
  },
  {
    question: "Where is VIBE Barbershop located in Batumi?",
    answer: "We are centrally located in the heart of Batumi, Georgia. We are easily accessible with free curbside parking outside. The atmosphere inside features high-fidelity premium acoustics, chilled soft drinks, coffee, or a glass of Georgian whiskey on the house."
  }
];

export const BEFORE_AFTER_IMAGES = {
  before: "https://picsum.photos/seed/barber_before/600/450?blur=2",
  after: "https://picsum.photos/seed/barber_after/600/450"
};
