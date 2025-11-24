-- Drop existing portfolio storage policies if they exist
DROP POLICY IF EXISTS "Public can view portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete portfolio images" ON storage.objects;

-- Recreate storage policies for portfolio bucket
-- Allow public to view portfolio images
CREATE POLICY "Public can view portfolio images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio');

-- Allow admins to upload portfolio images
CREATE POLICY "Admins can upload portfolio images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio' 
  AND public.has_role(auth.uid(), 'admin'::text)
);

-- Allow admins to update portfolio images
CREATE POLICY "Admins can update portfolio images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'portfolio' 
  AND public.has_role(auth.uid(), 'admin'::text)
);

-- Allow admins to delete portfolio images
CREATE POLICY "Admins can delete portfolio images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'portfolio' 
  AND public.has_role(auth.uid(), 'admin'::text)
);