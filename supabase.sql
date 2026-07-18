-- Run this query in your Supabase SQL Editor to create the bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    business_name TEXT,
    project_type TEXT,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings for CMS
CREATE TABLE public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_key TEXT UNIQUE NOT NULL,
    content_value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts to bookings" ON public.bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow authenticated users to read bookings" ON public.bookings FOR SELECT TO authenticated USING (true);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read of site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow anon updates for demo" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
