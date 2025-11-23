-- Create user_roles table to track admin users
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can view roles
CREATE POLICY "Only admins can view user roles"
ON public.user_roles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Only admins can manage roles
CREATE POLICY "Only admins can manage user roles"
ON public.user_roles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Create security definer function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(user_id UUID, required_role TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = user_id AND user_roles.role = required_role
  );
END;
$$;

-- Drop existing permissive policies on portfolio_items
DROP POLICY IF EXISTS "Authenticated users can insert portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Authenticated users can update portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Authenticated users can delete portfolio items" ON public.portfolio_items;

-- Create new admin-only policies for portfolio_items
CREATE POLICY "Only admins can insert portfolio items"
ON public.portfolio_items FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update portfolio items"
ON public.portfolio_items FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete portfolio items"
ON public.portfolio_items FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add storage policies to restrict uploads/deletes to admins only
CREATE POLICY "Public can view portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

CREATE POLICY "Only admins can upload to portfolio"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Only admins can delete from portfolio"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio' AND
  public.has_role(auth.uid(), 'admin')
);

-- Add trigger for updated_at on user_roles
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the first admin user (replace with your actual email)
-- IMPORTANT: After deployment, manually run this with your actual email:
-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'admin' FROM auth.users WHERE email = 'your-email@example.com';

COMMENT ON TABLE public.user_roles IS 'Stores user role assignments. After migration, manually grant admin role to your email address.';
COMMENT ON FUNCTION public.has_role IS 'Security definer function to check if a user has a specific role. Used by RLS policies.';