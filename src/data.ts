import { LashService, Testimonial, PortfolioItem } from './types';
import lashMacro from './assets/images/lash_macro_1779994363263.png';

export const LASH_SERVICES: LashService[] = [
  {
    id: '1d-classic',
    name: '1D Classic Elegance',
    price: 30,
    description: 'Perfect 1:1 application of premium weightless fibers. Provides elegant natural enhancement.',
    duration: '2h 40 mins',
    category: 'set',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '1d-classic-infill',
    name: '1D Classic - Infill (Întreținere)',
    price: 25,
    description: 'Maintenance infill to restore 1D Classic look. Recommended every 2-3 weeks.',
    category: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '2d-volume',
    name: '2D Volume - Full Set',
    price: 35,
    description: 'Lightweight double-lash application for beautiful, soft everyday texture.',
    duration: '2h 40 mins',
    category: 'set',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '2d-volume-infill',
    name: '2D Volume - Infill (Întreținere)',
    price: 30,
    description: 'Maintenance infill to refresh 2D Volume alignment and lush look.',
    category: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1522337094156-8d85f4e3553c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mega-volume',
    name: 'Mega Volume',
    price: 55,
    description: 'Mega Volume gives an intense, ultra-full lash look with maximum density and depth. It creates a bold, dramatic effect while still maintaining a soft, fluffy finish for high-impact glamour.',
    duration: '3h',
    category: 'set',
    imageUrl: 'https://res.cloudinary.com/dqffphhit/image/upload/v1780675958/WhatsApp_Image_2026-06-05_at_9.09.52_PM_xrr3zt.jpg'
  },
  {
    id: '3d-volume-infill',
    name: '3D Volume - Infill (Întreținere)',
    price: 35,
    description: 'Maintenance infill to restore fluffy multidimensional density to 3D Volume.',
    category: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'soft-volume',
    name: 'Soft Volume - Full Set',
    price: 45,
    description: 'Exquisite custom mapping designed for a delicate, cloud-soft visual signature.',
    duration: '2h 40 mins',
    category: 'set',
    imageUrl: 'https://images.unsplash.com/photo-1615396899839-c99c121888b5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'soft-volume-infill',
    name: 'Soft Volume - Infill (Întreținere)',
    price: 40,
    description: 'Restore the cloud-soft structure and elegant fan layout of Soft Volume.',
    category: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'wet-effect',
    name: 'Wet effect',
    price: 45,
    description: "Distinctive, high-contrast spiked mapping for a striking 'just out of the water' look.",
    duration: '2h 40 mins',
    category: 'set',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'medium-volume',
    name: 'Medium Volume - Full Set',
    price: 50,
    description: 'Rich, prominent density with elegant contour lines for stunning frame expression.',
    duration: '2h 40 mins',
    category: 'set',
    imageUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'medium-volume-infill',
    name: 'Medium Volume - Infill (Întreținere)',
    price: 45,
    description: 'Maintain the rich framing line-up and prominent depth of Medium Volume.',
    category: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mega-volume-infill',
    name: 'Mega Volume - Infill (Întreținere)',
    price: 50,
    description: 'Ultimate replenishment infill for our most luxurious, high-density masterpiece set.',
    category: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1583001809072-79913c7da97d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'lash-removal',
    name: 'Lash Removal',
    price: 10,
    description: 'Safe organic solvent removal with nourishing lid treatment. Essential for lash health.',
    duration: '30 mins',
    category: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'patch-test',
    name: 'Patch test',
    price: 0,
    description: 'A quick sensitivity check recommended at least 24-48 hours prior to your first eyelash extension appointment to prevent any adverse skin reaction.',
    duration: '15 mins',
    category: 'treatment',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'soft-volume',
    name: 'Soft Volume (4D-7D)',
    price: 45,
    description: '4D-7D creates a fuller, fluffier look with multiple lightweight extensions applied to each natural lash. It gives a soft, elegant volume effect without being too heavy, perfect for a glam yet delicate finish.',
    duration: '2h 40 mins',
    category: 'set',
    imageUrl: 'https://res.cloudinary.com/dqffphhit/image/upload/v1780680193/WhatsApp_Image_2026-06-05_at_10.21.47_PM_qd23x7.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Elena Petrova',
    role: 'Loyal Client',
    rating: 5,
    text: 'The precision and artistry at AV Lashes is unmatched. I\'ve never felt more confident with my extensions.',
    date: 'Oct 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: '2',
    name: 'Alexandra Moore',
    role: 'Regular Client',
    rating: 5,
    text: 'The studio atmosphere is so peaceful and professional. It\'s my favorite self-care ritual every three weeks.',
    date: 'Sep 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'VIP Client',
    rating: 5,
    text: 'The attention to detail during the application process is incredible. Amalia truly understands eye shapes and what suits you best.',
    date: 'Nov 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: '4',
    name: 'Jessica Blake',
    role: 'Regular Client',
    rating: 5,
    text: 'Worth every penny. The lashes last longer than any others I\'ve tried. High quality materials used.',
    date: 'Oct 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: '5',
    name: 'Michelle Chen',
    role: 'Premium Member',
    rating: 5,
    text: 'Finally found a studio that prioritizes natural lash health while delivering stunning volume and retention.',
    date: 'Dec 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: '6',
    name: 'Tasha W.',
    role: 'Loyal Client',
    rating: 5,
    text: 'Absolutely obsessed with my hybrid set. The transition from day to night is seamless. Thank you AV Lashes!',
    date: 'Jan 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    "id": "cld-1",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332047/IMG-20260601-WA0033_zjoqfy.jpg",
    "category": "classic",
    "title": "Glamorous Lash Mapping",
    "description": "Tailored extension map designed to frame the eye with soft, beautiful transitions."
  },
  {
    "id": "cld-2",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332047/IMG-20260601-WA0034_xodobq.jpg",
    "category": "hybrid",
    "title": "Perfect Classic Lash Set",
    "description": "Surgical 1:1 application of premium fibers matching natural lash density and length."
  },
  {
    "id": "cld-3",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332046/IMG-20260601-WA0035_i4whfu.jpg",
    "category": "volume",
    "title": "Wispy Textured Volume",
    "description": "Dynamic wispy fan styling creating beautiful, dense and fluffy textures."
  },
  {
    "id": "cld-4",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332046/IMG-20260601-WA0037_bfnyuz.jpg",
    "category": "mega volume",
    "title": "Premium Soft Volume Set",
    "description": "Flawless everyday density that remains completely lightweight and comfortable."
  },
  {
    "id": "cld-5",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332046/IMG-20260601-WA0038_tbbigp.jpg",
    "category": "classic",
    "title": "Featherweight Russian Fans",
    "description": "Finest hand-made Russian volume fans meticulously oriented for stunning definition."
  },
  {
    "id": "cld-6",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332045/IMG-20260601-WA0036_rbgsrf.jpg",
    "category": "hybrid",
    "title": "Bespoke Extreme Density",
    "description": "Maximum lash line saturation creating a bold, eye-catching eyeliner look."
  },
  {
    "id": "cld-7",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332045/IMG-20260601-WA0042_kyneob.jpg",
    "category": "volume",
    "title": "Elegant Hybrid Lift",
    "description": "Bespoke mixture of defined spikes and lightweight fluffy multi-lash fans."
  },
  {
    "id": "cld-8",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332045/IMG-20260601-WA0041_bpqpxj.jpg",
    "category": "mega volume",
    "title": "Custom Dramatic Mapping",
    "description": "Dramatic design mapping tailored to enhance natural anatomical eye curves."
  },
  {
    "id": "cld-9",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332044/IMG-20260601-WA0040_isyexc.jpg",
    "category": "classic",
    "title": "Fluffy Mink Extensions",
    "description": "Lush, touchably soft lashes styled for a naturally full, dense aesthetic."
  },
  {
    "id": "cld-10",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332044/IMG-20260601-WA0039_rakrzu.jpg",
    "category": "hybrid",
    "title": "High definition Mega Volume",
    "description": "Bold signature volume set with premium weightless fibers for maximum impact."
  },
  {
    "id": "cld-11",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332044/IMG-20260601-WA0047_vxkjck.jpg",
    "category": "volume",
    "title": "Glamorous Lash Mapping",
    "description": "Tailored extension map designed to frame the eye with soft, beautiful transitions."
  },
  {
    "id": "cld-12",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332043/IMG-20260601-WA0046_gxfo5n.jpg",
    "category": "mega volume",
    "title": "Perfect Classic Lash Set",
    "description": "Surgical 1:1 application of premium fibers matching natural lash density and length."
  },
  {
    "id": "cld-13",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332043/IMG-20260601-WA0045_svtjms.jpg",
    "category": "classic",
    "title": "Wispy Textured Volume",
    "description": "Dynamic wispy fan styling creating beautiful, dense and fluffy textures."
  },
  {
    "id": "cld-14",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332043/IMG-20260601-WA0044_kfprvz.jpg",
    "category": "hybrid",
    "title": "Premium Soft Volume Set",
    "description": "Flawless everyday density that remains completely lightweight and comfortable."
  },
  {
    "id": "cld-15",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332043/IMG-20260601-WA0043_usbrzj.jpg",
    "category": "volume",
    "title": "Featherweight Russian Fans",
    "description": "Finest hand-made Russian volume fans meticulously oriented for stunning definition."
  },
  {
    "id": "cld-16",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332042/IMG-20260601-WA0051_kinw1t.jpg",
    "category": "mega volume",
    "title": "Bespoke Extreme Density",
    "description": "Maximum lash line saturation creating a bold, eye-catching eyeliner look."
  },
  {
    "id": "cld-17",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332042/IMG-20260601-WA0050_srgnjm.jpg",
    "category": "classic",
    "title": "Elegant Hybrid Lift",
    "description": "Bespoke mixture of defined spikes and lightweight fluffy multi-lash fans."
  },
  {
    "id": "cld-18",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332042/IMG-20260601-WA0049_vtppot.jpg",
    "category": "hybrid",
    "title": "Custom Dramatic Mapping",
    "description": "Dramatic design mapping tailored to enhance natural anatomical eye curves."
  },
  {
    "id": "cld-19",
    "imageUrl": "https://res.cloudinary.com/ddcrshx6o/image/upload/v1780332042/IMG-20260601-WA0048_qrcdwp.jpg",
    "category": "volume",
    "title": "Fluffy Mink Extensions",
    "description": "Lush, touchably soft lashes styled for a naturally full, dense aesthetic."
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig1',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&h=300&q=80',
    likes: 124,
    comments: 8,
    type: 'lashes'
  },
  {
    id: 'ig2',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&h=300&q=80',
    likes: 245,
    comments: 14,
    type: 'setting'
  },
  {
    id: 'ig3',
    imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=300&h=300&q=80',
    likes: 189,
    comments: 11,
    type: 'interior'
  },
  {
    id: 'ig4',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=300&h=300&q=80',
    likes: 312,
    comments: 19,
    type: 'treatment'
  },
  {
    id: 'ig5',
    imageUrl: lashMacro,
    likes: 421,
    comments: 26,
    type: 'macro'
  }
];
