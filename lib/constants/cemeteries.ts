import { Cemetery } from '@/types'

// Accurate cemetery locations in the Caraga Region, Philippines
export const CARAGA_CEMETERIES: Cemetery[] = [
  {
    id: '1',
    name: 'Butuan Memorial Park',
    description:
      'A serene and well-maintained memorial park in the heart of Butuan City, offering premium plots and comprehensive services.',
    address: 'Km. 4, Libertad',
    city: 'Butuan City',
    type: 'memorial_park',
    // Libertad, Butuan City - accurate coordinates
    latitude: 8.9737,
    longitude: 125.4908,
    total_plots: 500,
    available_plots: 124,
    starting_price: 45000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbTKzKXd5hjPXNY7FPkY8H3pcAIphnz_oeAtWadrOtXzGJos-GJA9nia73bmCeIJVTC1H8SP8vl6CN8poIBVn5choeLj-DxghxV5R2OJcgAVnWIltvzk6rvZvNTtXd-AcOnINtEnQ0B6wMnBzgxTsu1hZN3HC_EItlvzgym4SwpM4nPeii_YPvzM74RFlS50JAE8I7BJ1wgeFQNoNfN2L7H_--uYdUukTCdomhVSJMrnH-neOt5flvEzYknnSvRsSKdakgyxRwoz8',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Eternal Gardens Memorial',
    description:
      'A peaceful garden-style cemetery with modern amenities situated along the scenic Baan Riverside.',
    address: 'Baan Riverside',
    city: 'Butuan City',
    type: 'private',
    // Baan, Butuan City - accurate coordinates
    latitude: 8.9214,
    longitude: 125.5651,
    total_plots: 300,
    available_plots: 45,
    starting_price: 82000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ60hqIVmi8vwXitslrMWIQNnQCRO-Cy8BU0v-lcbkB1PESuAm7oz2iG23YRmuF1d6fRzn02e5s43i7Htd2ZJ7SqTLhDAsQ0mEbxKrL5vUko92fEP2RubNy3Ve1EfDWxmMUb4dO1nM1n3o26u3PrEu0YBZdnSyzNJXxnIbb8Ai9zZ5CFiU3jACmJ6bvoCJSpSC55Lfd459cc9Lo9ihFjpgVAz7HN8TeFVn6-IzElbWAQ2CpfL67fOPTdq-TiUG-g3YrdWbTb5Zrhw',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cabadbaran Catholic Cemetery',
    description:
      'The principal Catholic cemetery of Cabadbaran City, serving families across Agusan del Norte.',
    address: 'Poblacion',
    city: 'Cabadbaran City',
    type: 'public',
    // Cabadbaran City - accurate coordinates
    latitude: 9.1837,
    longitude: 125.5316,
    total_plots: 200,
    available_plots: 12,
    starting_price: 15000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Holy Garden of Peace',
    description:
      'A dignified memorial park serving families in the northern districts of Butuan City.',
    address: 'Ambago',
    city: 'Butuan City',
    type: 'memorial_park',
    // Ambago, Butuan City - accurate coordinates
    latitude: 9.0012,
    longitude: 125.5189,
    total_plots: 350,
    available_plots: 87,
    starting_price: 55000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbTKzKXd5hjPXNY7FPkY8H3pcAIphnz_oeAtWadrOtXzGJos-GJA9nia73bmCeIJVTC1H8SP8vl6CN8poIBVn5choeLj-DxghxV5R2OJcgAVnWIltvzk6rvZvNTtXd-AcOnINtEnQ0B6wMnBzgxTsu1hZN3HC_EItlvzgym4SwpM4nPeii_YPvzM74RFlS50JAE8I7BJ1wgeFQNoNfN2L7H_--uYdUukTCdomhVSJMrnH-neOt5flvEzYknnSvRsSKdakgyxRwoz8',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Jabonga Municipal Cemetery',
    description:
      'The main public cemetery serving the municipality of Jabonga in Agusan del Norte.',
    address: 'Poblacion',
    city: 'Jabonga, Agusan del Norte',
    type: 'public',
    // Jabonga, Agusan del Norte - accurate coordinates
    latitude: 9.3349,
    longitude: 125.5203,
    total_plots: 180,
    available_plots: 62,
    starting_price: 12000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Surigao City Public Cemetery',
    description:
      'A historic public cemetery in the capital city of Surigao del Norte, maintained by the city government.',
    address: 'Taft',
    city: 'Surigao City',
    type: 'public',
    // Surigao City - accurate coordinates
    latitude: 9.7857,
    longitude: 125.4960,
    total_plots: 400,
    available_plots: 150,
    starting_price: 18000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

// Map center: Butuan City, the regional center of Caraga
export const CARAGA_MAP_CENTER: [number, number] = [8.9475, 125.5406]
export const CARAGA_MAP_ZOOM = 9

export const SERVICES = [
  {
    id: 's1',
    name: 'Chapel Service',
    description:
      'A 4-hour service in our Serenity Chapel with full audiovisual support and staff assistance.',
    price: 45000,
    icon: 'church',
    category: 'ceremony',
  },
  {
    id: 's2',
    name: 'Floral Tributes',
    description:
      'A curated arrangement of white lilies and chrysanthemums representing eternal peace.',
    price: 12500,
    icon: 'local_florist',
    category: 'tribute',
  },
  {
    id: 's3',
    name: 'Digital Legacy Program',
    description:
      'A permanent online memorial page with QR access at the plot for videos and messages.',
    price: 8000,
    icon: 'cloud_done',
    category: 'digital',
  },
  {
    id: 's4',
    name: 'Memorial Livestream',
    description:
      'High-definition streaming for family members abroad to join the service remotely.',
    price: 15000,
    icon: 'videocam',
    category: 'digital',
  },
  {
    id: 's5',
    name: 'Garden Blessing',
    description: 'A traditional outdoor blessing ritual conducted at the plot by a minister.',
    price: 6500,
    icon: 'spa',
    category: 'ceremony',
  },
]
