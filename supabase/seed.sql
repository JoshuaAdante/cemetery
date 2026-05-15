-- ============================================================
-- Butuan Memorial Booking Portal — Seed Data
-- Run AFTER schema.sql in the Supabase SQL Editor
-- ============================================================

-- ============================================================
-- CEMETERIES (Caraga Region, Philippines — Accurate GPS)
-- ============================================================
INSERT INTO public.cemeteries (id, name, address, city, province, region, type, latitude, longitude, total_plots, available_plots, starting_price, image_url, description) VALUES
(
  uuid_generate_v4(),
  'Butuan Memorial Park — Libertad',
  'National Highway, Libertad',
  'Butuan City',
  'Agusan del Norte',
  'Caraga',
  'memorial_park',
  8.9737,
  125.4908,
  450,
  124,
  45000,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  'The premier memorial park in Butuan City, offering beautifully landscaped gardens and modern facilities for dignified interment.'
),
(
  uuid_generate_v4(),
  'Eternal Gardens Memorial — Baan',
  'Baan District, Diversion Road',
  'Butuan City',
  'Agusan del Norte',
  'Caraga',
  'private',
  8.9214,
  125.5651,
  200,
  45,
  82000,
  'https://images.unsplash.com/photo-1605106901227-991bd663255b?w=400',
  'A private memorial estate in the Baan district, featuring premium plot packages and personalized legacy services.'
),
(
  uuid_generate_v4(),
  'Cabadbaran Catholic Cemetery',
  'Poblacion, Cabadbaran',
  'Cabadbaran City',
  'Agusan del Norte',
  'Caraga',
  'public',
  9.1837,
  125.5316,
  180,
  12,
  15000,
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
  'The main public cemetery serving the Cabadbaran community, maintained in partnership with the local Catholic parish.'
),
(
  uuid_generate_v4(),
  'Holy Garden of Peace — Ambago',
  'Ambago District',
  'Butuan City',
  'Agusan del Norte',
  'Caraga',
  'memorial_park',
  9.0012,
  125.5189,
  320,
  87,
  55000,
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  'A serene memorial garden in the Ambago district offering peaceful, garden-style burial grounds with modern amenities.'
),
(
  uuid_generate_v4(),
  'Jabonga Municipal Cemetery',
  'Poblacion, Jabonga',
  'Jabonga',
  'Agusan del Norte',
  'Caraga',
  'public',
  9.3349,
  125.5203,
  250,
  62,
  12000,
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
  'A well-maintained municipal cemetery serving the Jabonga community with affordable and accessible burial services.'
),
(
  uuid_generate_v4(),
  'Surigao City Public Cemetery — Taft',
  'Taft Street, Surigao City',
  'Surigao City',
  'Surigao del Norte',
  'Caraga',
  'public',
  9.7857,
  125.4960,
  600,
  150,
  18000,
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
  'The main public cemetery of Surigao City, located along Taft Street and serving the greater Surigao del Norte community.'
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SERVICES
-- ============================================================
INSERT INTO public.services (service_key, name, description, price, icon) VALUES
(
  'chapel',
  'Chapel Service',
  'Full-day access to our air-conditioned chapel, including floral centerpiece, sound system, and dedicated service coordinator.',
  45000,
  'church'
),
(
  'floral',
  'Floral Tributes',
  'Premium arrangement of 200 fresh white lilies and roses, hand-arranged by our certified florist for the ceremony and grave.',
  12500,
  'local_florist'
),
(
  'digital',
  'Digital Legacy',
  'A professionally curated online memorial page with photo gallery, life story, and guestbook — active for 5 years.',
  8000,
  'cloud'
),
(
  'livestream',
  'Memorial Livestream',
  'HD multi-camera livestream of the ceremony for family members who cannot attend in person. Includes replay access for 30 days.',
  15000,
  'videocam'
),
(
  'blessing',
  'Garden Blessing',
  'A solemn blessing ceremony for the grave site, led by a certified officiant of your chosen faith tradition.',
  6500,
  'self_improvement'
)
ON CONFLICT (service_key) DO NOTHING;
