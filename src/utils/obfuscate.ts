// Anti-scraping obfuscation helper to protect contact channels from automated botnets
const USER = 'myselfrezaul';
const DOMAIN = 'gmail';
const TLD = 'com';

export function getContactEmail(): string {
    return `${USER}@${DOMAIN}.${TLD}`;
}

export function getMailtoUrl(): string {
    return `mailto:${getContactEmail()}`;
}
