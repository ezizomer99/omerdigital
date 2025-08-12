-- After uploading images to Supabase Storage, insert image records
-- Replace these URLs with your actual Supabase Storage URLs

INSERT INTO project_images (project_id, image_url, alt_text, order_index) VALUES
-- Farsund Grappling images (project_id = 1)
(1, 'https://bchgoaxmxbqhpfiwkcte.supabase.co/storage/v1/object/public/project-images/farsund-grappling/desktop-homepage.png', 'Farsund Grappling desktop homepage', 0),
(1, 'https://bchgoaxmxbqhpfiwkcte.supabase.co/storage/v1/object/public/project-images/farsund-grappling/desktop-training.png', 'Farsund Grappling training schedule page', 1),
(1, 'https://bchgoaxmxbqhpfiwkcte.supabase.co/storage/v1/object/public/project-images/farsund-grappling/mobile-homepage.png', 'Farsund Grappling mobile homepage', 2);

-- Portfolio images (project_id = 2)
-- Add more as needed...
