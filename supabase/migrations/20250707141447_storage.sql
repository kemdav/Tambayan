-- supabase/migrations/xxxxxxxx_create_storage_policies.sql

-- ========= BUCKET CREATION =========
-- Create buckets if they don't already exist.
INSERT INTO storage.buckets (id, name, public)
VALUES
    ('post-attachments', 'post-attachments', true),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;


-- ========= POST-ATTACHMENTS POLICIES =========
DROP POLICY IF EXISTS "Allow authenticated read on post-attachments" ON storage.objects;
CREATE POLICY "Allow authenticated read on post-attachments"
ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'post-attachments');

DROP POLICY IF EXISTS "Allow authenticated upload to post-attachments" ON storage.objects;
CREATE POLICY "Allow authenticated upload to post-attachments"
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'post-attachments');


-- ========= AVATARS POLICIES =========
DROP POLICY IF EXISTS "Allow authenticated users to upload own avatar" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload own avatar"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
