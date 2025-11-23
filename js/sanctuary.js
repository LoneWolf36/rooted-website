/**
 * Sanctuary Section - Instagram Integration
 * Fetches and displays posts from @weare_rooted Instagram
 */

// Instagram configuration
const INSTAGRAM_CONFIG = {
  username: 'weare_rooted',
  postsToShow: 12,
  fallbackPosts: [
    {
      id: '1',
      image: './assets/mission/mission1.png',
      caption: 'Discover the ancient superfood',
      likes: 245,
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      image: './assets/mission/mission2.png',
      caption: 'Hand-harvested from Bihar ponds',
      likes: 312,
      timestamp: new Date().toISOString()
    },
    {
      id: '3',
      image: './assets/mission/mission3.png',
      caption: 'Sustainably grown, mindfully popped',
      likes: 189,
      timestamp: new Date().toISOString()
    },
    {
      id: '4',
      image: './assets/mission/mission4.png',
      caption: 'Join the Rooted family',
      likes: 276,
      timestamp: new Date().toISOString()
    },
    {
      id: '5',
      image: './assets/product/2.png',
      caption: 'Himalayan Pink Salt perfection',
      likes: 423,
      timestamp: new Date().toISOString()
    },
    {
      id: '6',
      image: './assets/generated/origin_artistic_seed.png',
      caption: 'From seed to snack',
      likes: 198,
      timestamp: new Date().toISOString()
    },
    {
      id: '7',
      image: './assets/generated/ritual_harvest.png',
      caption: 'The harvest begins',
      likes: 267,
      timestamp: new Date().toISOString()
    },
    {
      id: '8',
      image: './assets/generated/ritual_sundried.png',
      caption: 'Sun-dried naturally',
      likes: 234,
      timestamp: new Date().toISOString()
    },
    {
      id: '9',
      image: './assets/generated/ritual_popping.png',
      caption: 'Traditional popping method',
      likes: 312,
      timestamp: new Date().toISOString()
    },
    {
      id: '10',
      image: './assets/mission/mission1.png',
      caption: 'Nourishing communities',
      likes: 289,
      timestamp: new Date().toISOString()
    },
    {
      id: '11',
      image: './assets/mission/mission2.png',
      caption: 'Authentic flavors',
      likes: 356,
      timestamp: new Date().toISOString()
    },
    {
      id: '12',
      image: './assets/mission/mission3.png',
      caption: 'Taste the difference',
      likes: 401,
      timestamp: new Date().toISOString()
    }
  ]
};

/**
 * Instagram Feed Component
 */
function instagramFeed() {
  return {
    posts: [],
    loading: true,
    error: false,
    selectedPost: null,
    
    async init() {
      await this.loadPosts();
    },
    
    async loadPosts() {
      this.loading = true;
      this.error = false;
      
      try {
        // Note: Instagram's public API requires authentication
        // Using fallback posts for now. In production, implement server-side
        // Instagram Graph API or use a service like Juicer.io
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Use fallback posts
        this.posts = INSTAGRAM_CONFIG.fallbackPosts.slice(0, INSTAGRAM_CONFIG.postsToShow);
        
        // In production, replace with:
        // const response = await fetch(`/api/instagram/${INSTAGRAM_CONFIG.username}`);
        // this.posts = await response.json();
        
      } catch (err) {
        console.error('Failed to load Instagram posts:', err);
        this.error = true;
        this.posts = INSTAGRAM_CONFIG.fallbackPosts;
      } finally {
        this.loading = false;
      }
    },
    
    openPost(post) {
      this.selectedPost = post;
      document.body.style.overflow = 'hidden';
    },
    
    closePost() {
      this.selectedPost = null;
      document.body.style.overflow = '';
    },
    
    formatLikes(count) {
      if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
      }
      return count.toString();
    },
    
    getInstagramUrl() {
      return `https://www.instagram.com/${INSTAGRAM_CONFIG.username}/`;
    }
  };
}

/**
 * Sanctuary Hero Component
 */
function sanctuaryHero() {
  return {
    currentImageIndex: 0,
    heroImages: [
      './assets/product/2.png',
      './assets/generated/origin_artistic_seed.png',
      './assets/generated/ritual_harvest.png'
    ],
    
    init() {
      // Auto-rotate hero images
      setInterval(() => {
        this.nextImage();
      }, 5000);
    },
    
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
    },
    
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.heroImages.length) % this.heroImages.length;
    }
  };
}

// Export for Alpine.js
if (typeof window !== 'undefined') {
  window.instagramFeed = instagramFeed;
  window.sanctuaryHero = sanctuaryHero;
}