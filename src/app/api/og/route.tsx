import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Dynamic params
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Web Development & SEO Company in India';
      
    const tagline = searchParams.get('tagline') || 'Silver Wolf Technologies';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b', // background color (dark)
            backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            color: 'white',
            padding: '40px 80px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            {/* Logo placeholder or text */}
            <span style={{ fontSize: 60, fontWeight: 900, background: 'linear-gradient(to right, #3b82f6, #a855f7)', backgroundClip: 'text', color: 'transparent' }}>
              Silver Wolf
            </span>
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '30px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#a1a1aa', // text-muted-foreground
            }}
          >
            {tagline}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
