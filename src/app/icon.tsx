import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation - creates a sharp high-contrast favicon
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #16605e 0%, #1e7b78 100%)',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: 'sans-serif',
                }}
            >
                K
            </div>
        ),
        {
            ...size,
        }
    );
}
