-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN bio text,
ADD COLUMN location text,
ADD COLUMN job_title text;