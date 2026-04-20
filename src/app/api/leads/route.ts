import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface LeadPayload {
  name: string;
  phone: string;
  countryCode: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json();
    const { name, phone, countryCode, email } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const fullPhone = `${countryCode} ${phone}`;

    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name: name.trim(),
        phone: fullPhone,
        email: email.trim().toLowerCase(),
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message || 'Failed to save lead' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}