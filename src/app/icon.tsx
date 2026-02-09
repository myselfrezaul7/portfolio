import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20,
                    background: '#0a0a0a',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f5f5f0',
                    fontWeight: 600,
                    fontFamily: 'sans-serif',
                    borderRadius: 4, // Optional: adds slight rounding like modern app icons
                }}
            >
                M•K
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
