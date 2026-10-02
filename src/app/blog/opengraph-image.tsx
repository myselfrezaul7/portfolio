import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Insights & Writing - Md Rezaul Karim';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0a0a0a, #111118)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
            }}
          >
            Insights & Writing
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#d1d5db',
              margin: '0 0 10px 0',
            }}
          >
            Md Rezaul Karim
          </p>
          <p
            style={{
              fontSize: '18px',
              color: '#9ca3af',
              margin: 0,
            }}
          >
            Thoughts on operations, supply chain, technology, and building digital products.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <span
            style={{
              color: '#4a9b9b',
              fontSize: '16px',
            }}
          >
            mdkarim.vercel.app
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: '#4a9b9b',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
