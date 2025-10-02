export enum ImageSize {
  ICON = 'icon',         // 32x32 - für Icons, Navigation
  THUMBNAIL = 'thumbnail', // 100x100 - für kleine Vorschaubilder  
  LIST = 'list',         // 200x150 - für Produktlisten
  DETAIL = 'detail'      // 400x300 - für Produktdetails
}

export const SIZED_ASSETS = {
  // Lachs/Salmon
  lachs: {
    icon: '/assets/catalog-service/images/products/icons/salmon.jpg',
    thumbnail: '/assets/catalog-service/images/products/thumbnails/salmon.jpg',
    list: '/assets/catalog-service/images/products/list/salmon.jpg',
    detail: '/assets/catalog-service/images/products/detail/salmon.jpg'
  },
  salmon: {
    icon: '/assets/catalog-service/images/products/icons/salmon.jpg',
    thumbnail: '/assets/catalog-service/images/products/thumbnails/salmon.jpg',
    list: '/assets/catalog-service/images/products/list/salmon.jpg',
    detail: '/assets/catalog-service/images/products/detail/salmon.jpg'
  },
  
  // Thunfisch/Tuna
  thunfisch: {
    icon: '/assets/catalog-service/images/products/icons/tuna.jpg',
    thumbnail: '/assets/catalog-service/images/products/thumbnails/tuna.jpg',
    list: '/assets/catalog-service/images/products/list/tuna.jpg',
    detail: '/assets/catalog-service/images/products/detail/tuna.jpg'
  },
  tuna: {
    icon: '/assets/catalog-service/images/products/icons/tuna.jpg',
    thumbnail: '/assets/catalog-service/images/products/thumbnails/tuna.jpg',
    list: '/assets/catalog-service/images/products/list/tuna.jpg',
    detail: '/assets/catalog-service/images/products/detail/tuna.jpg'
  },
  
  // Garnelen/Shrimp
  garnelen: {
    icon: '/assets/catalog-service/images/products/icons/shrimp.jpg',
    thumbnail: '/assets/catalog-service/images/products/thumbnails/shrimp.jpg',
    list: '/assets/catalog-service/images/products/list/shrimp.jpg',
    detail: '/assets/catalog-service/images/products/detail/shrimp.jpg'
  },
  shrimp: {
    icon: '/assets/catalog-service/images/products/icons/shrimp.jpg',
    thumbnail: '/assets/catalog-service/images/products/thumbnails/shrimp.jpg',
    list: '/assets/catalog-service/images/products/list/shrimp.jpg',
    detail: '/assets/catalog-service/images/products/detail/shrimp.jpg'
  },
  
  // Default
  default: {
    icon: '/assets/catalog-service/images/products/icons/default.jpg',
    thumbnail: '/assets/catalog-service/images/products/thumbnails/default.jpg',
    list: '/assets/catalog-service/images/products/list/default.jpg',
    detail: '/assets/catalog-service/images/products/detail/default.jpg'
  }
};

export class AssetService {
  static getProductImage(productKey: string, size: ImageSize): string {
    const key = productKey.toLowerCase();
    return SIZED_ASSETS[key]?.[size] || SIZED_ASSETS.default[size];
  }
  
  static getImageForContext(productKey: string, context: string): string {
    switch (context.toLowerCase()) {
      case 'icon':
      case 'nav':
      case 'menu':
        return this.getProductImage(productKey, ImageSize.ICON);
      case 'thumbnail':
      case 'thumb':
      case 'small':
        return this.getProductImage(productKey, ImageSize.THUMBNAIL);
      case 'list':
      case 'grid':
      case 'catalog':
        return this.getProductImage(productKey, ImageSize.LIST);
      case 'detail':
      case 'full':
      case 'large':
        return this.getProductImage(productKey, ImageSize.DETAIL);
      default:
        return this.getProductImage(productKey, ImageSize.LIST);
    }
  }
}
