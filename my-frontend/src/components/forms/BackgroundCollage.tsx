import React from "react";
import "./BackgroundCollage.css";

type FormType = 'share' | 'member';

interface BackgroundCollageProps {
    formType: FormType;
}

// Get images for a specific form type - simplified approach
function getImagesForFormType(formType: FormType): string[] {
    if (formType === 'share') {
        return [
            '/images/share/Cow.jpg',
            '/images/share/Lamb.jpg', 
            '/images/share/Pig.jpg'
        ];
    } else {
        return [
            '/images/membership/Cow.jpg',
            '/images/membership/Lamb.jpg',
            '/images/membership/Pig.jpg'
        ];
    }
}

/** Shuffle array randomly */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/** Repeat images to fill the entire background with random distribution */
function repeatImages(images: string[], count = 50) {
    if (images.length === 0) return [];
    
    // Calculate how many times each image should be repeated
    const timesEach = Math.ceil(count / images.length);
    
    // Create a pool by repeating each image the calculated number of times
    const repeatedPool: string[] = [];
    for (let i = 0; i < timesEach; i++) {
        repeatedPool.push(...images);
    }
    
    // Shuffle the pool for random distribution
    const shuffledPool = shuffleArray(repeatedPool);
    
    // Take the first 'count' images from the shuffled pool
    return shuffledPool.slice(0, count);
}

export default function BackgroundCollage({ formType }: BackgroundCollageProps): React.ReactElement {
    // Get images directly - no async loading needed
    const images = getImagesForFormType(formType);
    const repeatedImages = repeatImages(images, 50);

    return (
        <div className="background-collage" aria-hidden>
            {repeatedImages.map((src, i) => (
                <img 
                    key={`bg-${i}-${src}-${i}`} 
                    src={src} 
                    alt="" 
                    className="collage-img" 
                    loading="lazy"
                    onError={(e) => {
                        // Hide broken images
                        e.currentTarget.style.display = 'none';
                    }}
                />
            ))}
        </div>
    );
}