import { v2 as cloudinary } from 'cloudinary';

export async function uploadImage(file: string) {
    try {
        // Configure inside the function to ensure environment variables are loaded
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });

        const secret = process.env.CLOUDINARY_API_SECRET || '';
        console.log('Cloudinary Config Attempt:', {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret_start: secret.substring(0, 4),
            api_secret_end: secret.substring(secret.length - 4),
        });

        const result = await cloudinary.uploader.upload(file, {
            resource_type: 'image',
        });
        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}

export async function deleteImage(publicId: string) {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw error;
    }
}

export default cloudinary;

export function getOptimizedUrl(publicId: string, options: {
    width?: number;
    height?: number;
    crop?: string;
} = {}) {
    return cloudinary.url(publicId, {
        secure: true,
        quality: 'auto',
        fetch_format: 'auto',
        ...options,
    });
}
