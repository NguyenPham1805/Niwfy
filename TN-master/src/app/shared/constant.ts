export interface Link {
  slug: string;
  query?: number;
  name: string;
}

export const GENRES: Link[] = [
  { slug: 'action', name: 'hành động' },
  { slug: 'adventure', name: 'phiêu lưu' },
  { slug: 'anime', name: 'chuyển thể' },
  { slug: 'chuyen-sinh-213', name: 'chuyển sinh' },
  { slug: 'comedy-99', name: 'hài hước' },
  { slug: 'cooking', name: 'cooking' },
  { slug: 'co-dai-207', name: 'cổ đại' },
  { slug: 'doujinshi', name: 'doujinshi' },
  { slug: 'drama-103', name: 'drama' },
  { slug: 'ecchi', name: 'ecchi' },
  { slug: 'fantasy-105', name: 'fantasy' },
  { slug: 'harem-107', name: 'harem' },
  { slug: 'historycal', name: 'lịch sử' },
  { slug: 'horror', name: 'kinh dị' },
  { slug: 'josei', name: 'josei' },
  { slug: 'shoujo-ai-126', name: 'yuri' },
  { slug: 'live-action', name: 'đời thực' },
  { slug: 'sci-fi', name: 'viễn tưởng' },
  { slug: 'martial-arts', name: 'võ thuật' },
  { slug: 'mature', name: 'bạo lực' },
  { slug: 'truyen-scan', name: 'truyện scan' },
  { slug: 'mecha-117', name: 'robot' },
  { slug: 'mystery', name: 'bí ẩn' },
  { slug: 'dam-my', name: 'yaoi' },
  { slug: 'xuyen-khong-205', name: 'chuyển sinh' },
  { slug: 'seinen', name: 'seinen' },
  { slug: 'ngon-tinh', name: 'ngôn tình' },
  { slug: 'trinh-tham', name: 'trinh thám' },
  { slug: 'one-shot', name: 'truyện ngắn' },
  { slug: 'psychological', name: 'tâm lí' },
  { slug: 'romance-121', name: 'tình cảm' },
  { slug: 'thieu-nhi', name: 'thiếu nhi' },
  { slug: 'truong-thanh', name: '17+' },
  { slug: 'smut', name: '18+' },
  { slug: 'school-life', name: 'học đường' },
  { slug: 'shoujo', name: 'shoujo' },
  { slug: 'shounen', name: 'shounen' },
  { slug: 'slice-of-life', name: 'đời thường' },
  { slug: 'sports', name: 'thể thao' },
  { slug: 'supernatural', name: 'powers' },
  { slug: 'truyen-mau', name: 'truyện màu' },
  { slug: 'tragedy-136', name: 'tragedy' },
];

export const COUNTRIES: Link[] = [
  { slug: 'manga-112', name: 'nhật bản' },
  { slug: 'manhua', name: 'trung quốc' },
  { slug: 'manhwa-1140', name: 'hàn quốc' },
];

export const RANKINGS: Link[] = [
  { slug: 'like', name: 'yêu thích', query: 20 },
  { slug: 'day', name: 'ngày', query: 13 },
  { slug: 'week', name: 'tuần', query: 12 },
  { slug: 'month', name: 'tháng', query: 11 },
  { slug: 'all', name: 'toàn thời gian', query: 10 },
];
