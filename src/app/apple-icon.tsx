import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#F4F1EC',
                    borderRadius: '22%',
                }}
            >
                <svg viewBox="0 0 100 100" width="120" height="120">
                    <path
                        d="M 30 15 L 30 85"
                        stroke="#1a1a1a"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="square"
                    />
                    <path
                        d="M 32 50 L 74 15"
                        stroke="#1a1a1a"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="square"
                    />
                    <path
                        d="M 32 50 L 74 85"
                        stroke="#1a1a1a"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="square"
                    />
                    <circle cx="32" cy="50" r="5" fill="#4a9b9b" />
                </svg>
            </div>
        ),
        { ...size }
    );
}
