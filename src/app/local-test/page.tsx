// app/local-test/page.tsx

// Make sure you have installed `@supabase/ssr`
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

//              👇 The fix is right here!
export default async function LocalTestPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    // Your .env.local file MUST have these variables defined
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
      },
    }
  );

  const { data, error } = await supabase.from('test_items').select('name');

  if (error) {
    return (
      <div>
        <h1>Test Failed</h1>
        <p>Could not connect to the database or table.</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Local Database Test (Using @supabase/ssr)</h1>
      <p>
        If you can see the message below, your Next.js app is correctly
        connected to your local Supabase instance.
      </p>
      <hr />
      <h2>Data from 'test_items' table:</h2>
      <ul>
        {data && data.length > 0 ? (
          data.map((item, index) => <li key={index}>{item.name}</li>)
        ) : (
          <li>No items found. Did you insert a row in your local Studio?</li>
        )}
      </ul>
    </div>
  );
}