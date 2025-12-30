/**
 * Asset Verification Script
 * Checks if all images, videos, CSS, and JS files are loading correctly
 */

class AssetVerifier {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.successCount = 0;
    }

    // Check if an image loads successfully
    async checkImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                this.successCount++;
                resolve(true);
            };
            img.onerror = () => {
                this.errors.push(`Image failed to load: ${src}`);
                resolve(false);
            };
            img.src = src;
        });
    }

    // Check if a video loads successfully
    async checkVideo(src) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.onloadeddata = () => {
                this.successCount++;
                resolve(true);
            };
            video.onerror = () => {
                this.errors.push(`Video failed to load: ${src}`);
                resolve(false);
            };
            video.src = src;
        });
    }

    // Check if a script loads successfully
    async checkScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.onload = () => {
                this.successCount++;
                resolve(true);
            };
            script.onerror = () => {
                this.errors.push(`Script failed to load: ${src}`);
                resolve(false);
            };
            script.src = src;
            document.head.appendChild(script);
        });
    }

    // Check if a stylesheet loads successfully
    async checkStylesheet(href) {
        return new Promise((resolve) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.onload = () => {
                this.successCount++;
                resolve(true);
            };
            link.onerror = () => {
                this.errors.push(`Stylesheet failed to load: ${href}`);
                resolve(false);
            };
            link.href = href;
            document.head.appendChild(link);
        });
    }

    // Verify all assets on the current page
    async verifyAllAssets() {
        console.log('🔍 Starting asset verification...');
        
        const images = document.querySelectorAll('img');
        const videos = document.querySelectorAll('video source');
        const scripts = document.querySelectorAll('script[src]');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

        // Check images
        for (let img of images) {
            await this.checkImage(img.src);
        }

        // Check videos
        for (let video of videos) {
            await this.checkVideo(video.src);
        }

        // Check scripts
        for (let script of scripts) {
            await this.checkScript(script.src);
        }

        // Check stylesheets
        for (let stylesheet of stylesheets) {
            await this.checkStylesheet(stylesheet.href);
        }

        this.generateReport();
    }

    // Generate verification report
    generateReport() {
        console.log('\n📊 Asset Verification Report');
        console.log('============================');
        console.log(`✅ Successful loads: ${this.successCount}`);
        console.log(`❌ Errors: ${this.errors.length}`);
        console.log(`⚠️  Warnings: ${this.warnings.length}`);

        if (this.errors.length > 0) {
            console.log('\n❌ Errors found:');
            this.errors.forEach(error => console.log(`  - ${error}`));
        }

        if (this.warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            this.warnings.forEach(warning => console.log(`  - ${warning}`));
        }

        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('\n🎉 All assets are loading correctly!');
        }

        // Store results for external access
        window.assetVerificationResults = {
            successCount: this.successCount,
            errors: this.errors,
            warnings: this.warnings,
            timestamp: new Date().toISOString()
        };
    }
}

// Auto-run verification when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const verifier = new AssetVerifier();
    verifier.verifyAllAssets();
});

// Export for manual use
window.AssetVerifier = AssetVerifier; 