export type TImages = {
    id: number,
    image: string,
    thumbnail: string,
    user: number,
}

export type TItem = {
    id: number,
    images: TImages[],
    city_name: string,
    district_name: string,
    title: string,
    description: string,
    price: number,
    created_at: string,
    views: number,
    user: number
}

export type TAds = {
    page: number,
    pageSize: number,
    results: TItem[],
    total: number
}