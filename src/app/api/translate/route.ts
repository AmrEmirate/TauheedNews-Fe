import { NextResponse } from 'next/server';

// Server-side in-memory translation cache
const serverCache: Record<string, string> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  const target = searchParams.get('target') || 'en';

  if (!text || text.trim() === '' || target === 'id') {
    return NextResponse.json({ translatedText: text });
  }

  const cleanText = text.trim();
  const cacheKey = `${target}:${cleanText}`;

  // 1. Check server cache
  if (serverCache[cacheKey]) {
    return NextResponse.json({ translatedText: serverCache[cacheKey] });
  }

  // 2. Try Google Translate GTX Endpoint (Server-Side)
  try {
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${target}&dt=t&q=${encodeURIComponent(cleanText)}`;
    const response = await fetch(gtxUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 86400 }, // Cache on Next.js server for 24 hours
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translatedParts = data[0].map((item: any) => item[0]).filter(Boolean);
        const result = translatedParts.join('');
        if (result && result.trim() !== '') {
          serverCache[cacheKey] = result;
          return NextResponse.json({ translatedText: result });
        }
      }
    }
  } catch (error) {
    console.error('Server-side Google GTX error:', error);
  }

  // 3. Fallback: MyMemory API (Server-Side)
  try {
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=id|${target}`;
    const response = await fetch(mmUrl, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 86400 },
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.responseData?.translatedText) {
        const translated = data.responseData.translatedText;
        if (!translated.includes('MYMEMORY WARNING') && !translated.includes('QUERY LENGTH LIMIT EXCEEDED')) {
          serverCache[cacheKey] = translated;
          return NextResponse.json({ translatedText: translated });
        }
      }
    }
  } catch (error) {
    console.error('Server-side MyMemory error:', error);
  }

  return NextResponse.json({ translatedText: cleanText });
}
