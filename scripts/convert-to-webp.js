const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'public', 'images', 'projects');
const files = ['nextepedu', 'petbhai', 'kuttawaala', 'catwaala'];

async function convert() {
    for (const name of files) {
        const jpgPath = path.join(projectsDir, `${name}.jpg`);
        const webpPath = path.join(projectsDir, `${name}.webp`);

        if (!fs.existsSync(jpgPath)) {
            console.log(`Skipping ${name}.jpg - not found`);
            continue;
        }

        // Convert to WebP
        await sharp(jpgPath)
            .webp({ quality: 80 })
            .toFile(webpPath);

        const webpSize = fs.statSync(webpPath).size;
        const jpgSize = fs.statSync(jpgPath).size;
        console.log(`${name}: ${jpgSize} bytes (jpg) -> ${webpSize} bytes (webp) = ${Math.round((1 - webpSize / jpgSize) * 100)}% smaller`);

        // Generate blur placeholder (10px wide, base64)
        const blurBuffer = await sharp(jpgPath)
            .resize(10, 6, { fit: 'cover' })
            .blur()
            .toBuffer();

        const blurDataURI = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;
        console.log(`${name} blur: ${blurDataURI}`);
    }

    // Delete original JPGs
    for (const name of files) {
        const jpgPath = path.join(projectsDir, `${name}.jpg`);
        if (fs.existsSync(jpgPath)) {
            fs.unlinkSync(jpgPath);
            console.log(`Deleted ${name}.jpg`);
        }
    }
}

convert().catch(console.error);
