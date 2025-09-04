import BottomNav from "@/components/layout/BottomNav";

import { ReactComponent as SearchIcon } from "@/assets/icons/Search.svg";
import { ReactComponent as PlayIcon } from "@/assets/icons/Play.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/Heart.svg";
import { ReactComponent as SendIcon } from "@/assets/icons/Send.svg";
import { ReactComponent as DotIcon } from "@/assets/icons/Dot.svg";

interface Post {
  id: number;
  username: string;
  timeAgo: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  content: string;
  profileImage: string;
}

interface Recommendation {
  id: number;
  name: string;
  image: string;
}

const mockPosts: Post[] = [
  {
    id: 1,
    username: "Prince_93",
    timeAgo: "38분 전",
    image: "@/assets/images/characters/office.png",
    likes: 51,
    comments: 3,
    shares: 8,
    content: "퇴근하면 전화해",
    profileImage: "/image/characters/character1.png",
  },
  {
    id: 2,
    username: "B_caat",
    timeAgo: "2시간 전",
    image: "/image/backgrounds/비 오는 밤 레코드숍.png",
    likes: 142,
    comments: 16,
    shares: 19,
    content:
      "백현우 내 목숨 다하는 날까지 그대만을 기억하리니, 부디 다른 세상에서 다시 만나기를 바라오. 내 마음은 언제나 그대 곁에 머물 것이오.",
    profileImage: "/image/characters/character2.png",
  },
  {
    id: 3,
    username: "moyaaa__",
    timeAgo: "4시간 전",
    image: "/image/backgrounds/유리 천장의 온실.png",
    likes: 591,
    comments: 33,
    shares: 82,
    content: "내가 너랑 친한 건 행운일까 아님, 불행일까.",
    profileImage: "/image/characters/character3.png",
  },
];

const mockRecommendations: Recommendation[] = [
  { id: 1, name: "Name", image: "/image/characters/character1.png" },
  { id: 2, name: "Name", image: "/image/characters/character2.png" },
  { id: 3, name: "Name", image: "/image/characters/character3.png" },
  { id: 4, name: "Name", image: "/image/characters/character1.png" },
];

export default function Feed() {
  return (
    <>
      <div className="pb-20 bg-[#12121d] min-h-screen">
        {/* 상단 네비게이션 */}
        <div className="bg-[#12121d] px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-[#f5f5fa]">탐색하기</h1>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <SearchIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* 추천 섹션 */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-15 h-15 rounded-full bg-gradient-to-b from-[#3c2089] to-[#6938ef] flex items-center justify-center  p-4">
                <div className="w-6 h-6 pl-1 flex items-center justify-center">
                  <PlayIcon className="w-6 h-6  text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-[#f5f5fa] text-center mt-2">
                추천
              </p>
            </div>
            <div className="flex gap-3 ">
              {mockRecommendations.map((rec) => (
                <div key={rec.id} className="flex flex-col items-center">
                  <div className="w-15 h-15 rounded-full bg-gray-600 overflow-hidden p-3">
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium text-[#b5b6c4] mt-2">
                    {rec.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 게시물들 */}
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <div key={post.id}>
              {/* 게시물 헤더 */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={post.profileImage}
                      alt={post.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f5f5fa]">
                      {post.username}
                    </p>
                    <p className="text-xs font-medium text-[#6e7189]">
                      {post.timeAgo}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <DotIcon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* 게시물 이미지 */}
              <div className="px-4">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="게시물"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 게시물 액션 버튼 */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <HeartIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#b5b6c4]">
                      {post.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <SendIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#b5b6c4]">
                      {post.comments}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <SendIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#b5b6c4]">
                      {post.shares}
                    </span>
                  </div>
                </div>

                {/* 게시물 내용 */}
                <div className="mb-2">
                  <span className="text-sm font-semibold text-[#f5f5fa] mr-2">
                    사용자명
                  </span>
                  <span className="text-sm text-[#f5f5fa]">{post.content}</span>
                </div>

                <p className="text-sm font-medium text-[#595a70]">더보기</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </>
  );
}
