import {
  CircularCategory,
  NavCategory,
  SearchCollectionItem,
  MostLovedCategoryItem,
} from "@/types";

/**
 * 12 Adet "Shop Your Style" Dairesel Kategori Verisi
 */
export const CIRCULAR_CATEGORIES: CircularCategory[] = [
  {
    id: 1,
    name: "Christmas Stocking",
    slug: "christmas-stocking",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/2250b385-cf3d-426a-9893-0b51473addb3_250.webp",
  },
  {
    id: 2,
    name: "Beach Towel",
    slug: "beach-towel",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/c6e8342d-85e9-48ff-b389-1c68187f1583_250.webp",
  },
  {
    id: 3,
    name: "Rugs",
    slug: "rugs",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/c4f7dcd3-d8fc-44d4-9154-837de89b1c3f_250.webp",
  },
  {
    id: 4,
    name: "Decorative Pillows",
    slug: "decorative-pillows",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/c889141c-9c23-494e-be72-71dd6093d972_250.webp",
  },
  {
    id: 5,
    name: "Baked Goods",
    slug: "baked-goods",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/93605eab-eda4-4dee-bb3a-ca307a989dc0_250.webp",
  },
  {
    id: 6,
    name: "Bedding & Linens",
    slug: "bedding-and-linens",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/9848d640-f9b2-4e6a-8b14-672fc80f8bb1_250.webp",
  },
  {
    id: 7,
    name: "Jewelry",
    slug: "jewelry",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/b96c5796-28e5-48b6-9740-ad6927d1bd83_250.webp",
  },
  {
    id: 8,
    name: "Canvas",
    slug: "canvas",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/9893a9b7-6f93-4ab4-9b2c-8f0056addf22_250.webp",
  },
  {
    id: 9,
    name: "Bench",
    slug: "bench",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/f202ad0f-80ae-439c-a8a7-ae1fcc43b258_250.webp",
  },
  {
    id: 10,
    name: "Coffee",
    slug: "coffee",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/da6cce55-0835-4bd1-9734-573f5434b1a6_250.webp",
  },
  {
    id: 11,
    name: "Wallpapers",
    slug: "wallpapers",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/4d84d331-1852-49b3-ab66-bbfc01eada24_250.webp",
  },
  {
    id: 12,
    name: "Ottomans",
    slug: "ottomans",
    imageUrl: "https://cdn.elonky.com/section-category-file/image/f2474a48-ed9a-4749-85a6-bc42a844eae7_250.webp",
  },
];

/**
 * Üst Navigasyon Çubuğundaki Öne Çıkan Koleksiyonlar
 */
export const FEATURED_NAV_COLLECTIONS: NavCategory[] = [
  { id: "col-1", name: "Honeymoon Travel Gift", slug: "honeymoon-travel-gift", href: "/collections/honeymoon-travel-gift", isFeatured: true },
  { id: "col-2", name: "Curated Canvas Picks", slug: "curated-canvas-picks", href: "/collections/curated-canvas-picks", isFeatured: true },
  { id: "col-3", name: "Best Beach Towels", slug: "best-beach-towels", href: "/collections/best-beach-towels", isFeatured: true },
  { id: "col-4", name: "Best Christmas Stockings", slug: "best-christmas-stockings", href: "/collections/best-christmas-stockings", isFeatured: true },
];

/**
 * 13 Ana Kategori Listesi (Mega Menü & Kategori Filtresi)
 */
export const MAIN_NAV_CATEGORIES: NavCategory[] = [
  { id: "cat-1", name: "Home & Living", slug: "home-and-living", href: "/category/home-and-living" },
  { id: "cat-2", name: "Home Decor", slug: "home-decor", href: "/category/home-decor" },
  { id: "cat-3", name: "Wall Decor", slug: "wall-decor", href: "/category/wall-decor" },
  { id: "cat-4", name: "Home Textiles", slug: "home-textiles", href: "/category/home-textiles" },
  { id: "cat-5", name: "Kitchen & Dining", slug: "kitchen-and-dining", href: "/category/kitchen-and-dining" },
  { id: "cat-6", name: "Furniture", slug: "furniture", href: "/category/furniture" },
  { id: "cat-7", name: "Fashion", slug: "fashion", href: "/category/fashion" },
  { id: "cat-8", name: "Jewelry", slug: "jewelry", href: "/category/jewelry" },
  { id: "cat-9", name: "Accessories", slug: "accessories", href: "/category/accessories" },
  { id: "cat-10", name: "Food & Beverages", slug: "food-and-beverages", href: "/category/food-and-beverages" },
  { id: "cat-11", name: "Health & Care", slug: "health-and-care", href: "/category/health-and-care" },
  { id: "cat-12", name: "Baby & Toddler", slug: "baby-and-toddler", href: "/category/baby-and-toddler" },
  { id: "cat-13", name: "Animals & Pet", slug: "animals-and-pet", href: "/category/animals-and-pet" },
];

/**
 * Arama Çubuğu Odaklandığında Gösterilen Görselli Koleksiyon Önerileri
 */
export const SEARCH_COLLECTIONS: SearchCollectionItem[] = [
  {
    id: "col-1",
    name: "Christmas Stockings",
    href: "/collections/best-christmas-stockings",
    image: "https://cdn.elonky.com/section-category-file/image/2250b385-cf3d-426a-9893-0b51473addb3_250.webp",
  },
  {
    id: "col-2",
    name: "Turkish Beach Towel",
    href: "/collections/best-beach-towels",
    image: "https://cdn.elonky.com/section-category-file/image/c6e8342d-85e9-48ff-b389-1c68187f1583_250.webp",
  },
  {
    id: "col-3",
    name: "Vintage Kilim Rugs",
    href: "/collections/vintage-kilim-rugs",
    image: "https://cdn.elonky.com/section-category-file/image/c4f7dcd3-d8fc-44d4-9154-837de89b1c3f_250.webp",
  },
  {
    id: "col-4",
    name: "Decorative Pillows",
    href: "/collections/decorative-pillows",
    image: "https://cdn.elonky.com/section-category-file/image/c889141c-9c23-494e-be72-71dd6093d972_250.webp",
  },
  {
    id: "col-5",
    name: "Canvas Wall Art",
    href: "/collections/curated-canvas-picks",
    image: "https://cdn.elonky.com/product/image/6f942ee8-036a-42c8-98ac-c1a5d1942ea4/70b4f7b0-1293-4d3e-aa43-3009f47ac99b.webp",
  },
  {
    id: "col-6",
    name: "Ceramic Mugs",
    href: "/collections/ceramic-mugs",
    image: "https://cdn.elonky.com/section-category-file/image/93605eab-eda4-4dee-bb3a-ca307a989dc0_250.webp",
  },
];

/**
 * Ana Sayfa "Most-Loved Categories" 5 Squircle Kart Verisi
 */
export const MOST_LOVED_CATEGORIES: MostLovedCategoryItem[] = [
  {
    id: "cat-pillows",
    name: "Throw Pillows",
    slug: "throw-pillows",
    image: "https://cdn.elonky.com/section-category-file/image/c889141c-9c23-494e-be72-71dd6093d972_250.webp",
  },
  {
    id: "cat-beanbags",
    name: "Bean Bag Chairs",
    slug: "bean-bag-chairs",
    image: "https://cdn.elonky.com/section-category-file/image/f202ad0f-80ae-439c-a8a7-ae1fcc43b258_250.webp",
  },
  {
    id: "cat-bathrobes",
    name: "Bathrobes",
    slug: "bathrobes",
    image: "https://cdn.elonky.com/section-category-file/image/c6e8342d-85e9-48ff-b389-1c68187f1583_250.webp",
  },
  {
    id: "cat-petmats",
    name: "Pet Mats & Pads",
    slug: "pet-mats-and-pads",
    image: "https://cdn.elonky.com/section-category-file/image/c4f7dcd3-d8fc-44d4-9154-837de89b1c3f_250.webp",
  },
  {
    id: "cat-footstools",
    name: "Footstools",
    slug: "footstools",
    image: "https://cdn.elonky.com/section-category-file/image/f2474a48-ed9a-4749-85a6-bc42a844eae7_250.webp",
  },
];
