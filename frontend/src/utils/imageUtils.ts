/**
 * API에서 받은 이미지 경로를 루트 public 폴더 기준으로 변환하는 함수
 * @param dbPath - API에서 받은 이미지 경로
 * @returns 변환된 이미지 URL
 *
 * @example
 * getImageUrl("public/character/ch_2.png") // "/character/ch_2.png"
 * getImageUrl("character/린즈쉔.png") // "/character/린즈쉔.png"
 * getImageUrl("background/bg_1.png") // "/background/bg_1.png"
 */
export const getImageUrl = (dbPath: string): string => {
  let cleanPath = dbPath;
  if (cleanPath.startsWith("public/")) {
    cleanPath = cleanPath.replace("public/", "");
  }
  return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
};
