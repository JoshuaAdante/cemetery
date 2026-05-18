import { Cemetery } from '@/types'

// Cemetery directory for the Caraga Region, Philippines
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
  {
    id: '7',
    name: 'Zamora Cemetery',
    description:
      'A public cemetery serving families near Barangay Zamora and nearby Butuan City communities.',
    address: 'Zamora',
    city: 'Butuan City',
    type: 'public',
    latitude: 8.9467,
    longitude: 125.5395,
    total_plots: 220,
    available_plots: 54,
    starting_price: 14000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Sanctuario de Caraga Memorial Park',
    description:
      'A private memorial park development in Butuan City with lawn plots and family memorial options.',
    address: 'Barangay Bit-os',
    city: 'Butuan City',
    type: 'private',
    latitude: 8.9086,
    longitude: 125.5964,
    total_plots: 420,
    available_plots: 180,
    starting_price: 38000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ60hqIVmi8vwXitslrMWIQNnQCRO-Cy8BU0v-lcbkB1PESuAm7oz2iG23YRmuF1d6fRzn02e5s43i7Htd2ZJ7SqTLhDAsQ0mEbxKrL5vUko92fEP2RubNy3Ve1EfDWxmMUb4dO1nM1n3o26u3PrEu0YBZdnSyzNJXxnIbb8Ai9zZ5CFiU3jACmJ6bvoCJSpSC55Lfd459cc9Lo9ihFjpgVAz7HN8TeFVn6-IzElbWAQ2CpfL67fOPTdq-TiUG-g3YrdWbTb5Zrhw',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Bayugan Public Cemetery',
    description:
      'The main public cemetery serving Bayugan City and nearby Agusan del Sur barangays.',
    address: 'Poblacion',
    city: 'Bayugan City, Agusan del Sur',
    type: 'public',
    latitude: 8.7147,
    longitude: 125.7481,
    total_plots: 360,
    available_plots: 118,
    starting_price: 13000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Barangay Aurora Cemetery',
    description:
      'A community cemetery in Prosperidad for local families in central Agusan del Sur.',
    address: 'Barangay Aurora',
    city: 'Prosperidad, Agusan del Sur',
    type: 'public',
    latitude: 8.5844,
    longitude: 125.8971,
    total_plots: 190,
    available_plots: 41,
    starting_price: 11000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Tandag City Public Cemetery',
    description:
      'A public cemetery serving Tandag City and families across Surigao del Sur.',
    address: 'Poblacion',
    city: 'Tandag City, Surigao del Sur',
    type: 'public',
    latitude: 9.0786,
    longitude: 126.1986,
    total_plots: 280,
    available_plots: 73,
    starting_price: 15000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'Bislig City Public Cemetery',
    description:
      'A city cemetery serving Bislig and the southern communities of Surigao del Sur.',
    address: 'Mangagoy',
    city: 'Bislig City, Surigao del Sur',
    type: 'public',
    latitude: 8.2153,
    longitude: 126.3161,
    total_plots: 340,
    available_plots: 96,
    starting_price: 14000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '13',
    name: 'Revelo Private Cemetery',
    description:
      'A private cemetery serving families in Claver and nearby Surigao del Norte communities.',
    address: 'Ladgaron - Daywan Feeder Road',
    city: 'Claver, Surigao del Norte',
    type: 'private',
    latitude: 9.5741,
    longitude: 125.7318,
    total_plots: 120,
    available_plots: 26,
    starting_price: 24000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ60hqIVmi8vwXitslrMWIQNnQCRO-Cy8BU0v-lcbkB1PESuAm7oz2iG23YRmuF1d6fRzn02e5s43i7Htd2ZJ7SqTLhDAsQ0mEbxKrL5vUko92fEP2RubNy3Ve1EfDWxmMUb4dO1nM1n3o26u3PrEu0YBZdnSyzNJXxnIbb8Ai9zZ5CFiU3jACmJ6bvoCJSpSC55Lfd459cc9Lo9ihFjpgVAz7HN8TeFVn6-IzElbWAQ2CpfL67fOPTdq-TiUG-g3YrdWbTb5Zrhw',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '14',
    name: 'Dinagat Municipal Cemetery',
    description:
      'A municipal cemetery serving residents of Dinagat Islands and nearby barangays.',
    address: 'Poblacion',
    city: 'Dinagat, Dinagat Islands',
    type: 'public',
    latitude: 9.9561,
    longitude: 125.5932,
    total_plots: 150,
    available_plots: 38,
    starting_price: 12000,
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgO5vVFRmv5CGTDX3gYVCeIeFJDMbl1rn0zza6Pav4WFxH8hU7kkytnr1aibb1Li8Gp4tri24Yaz99_T3sIpXZ4EMJhEs9Bt2HMXFwl0yTNVbQaJzW712dKipxhRY74dFxI93MtSyhbDQo3qAugGnko0AqHFpyOvYOdr9dvh0hbg9zet_vyc_Me5oNqPWSt8IDMMebQxrS-bzIArRQ4TONXt7oKpmybIKr0bWzh9cA5TV_FYCnEYzPklp-zsXssSqYVaACtgbz0',
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

// Map center: Caraga-wide view
export const CARAGA_MAP_CENTER: [number, number] = [9.05, 125.92]
export const CARAGA_MAP_ZOOM = 8

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
