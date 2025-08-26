// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * 사용법:
 * 1) 아래 USER_ID를 실제 존재하는 유저 id로 바꾸거나,
 *    환경변수 SEED_USER_ID 로 넘겨주세요.
 * 2) 실행: npx prisma db seed  (또는 tsx/ts-node로 실행)
 */
const USER_ID = '4df920aa-96a0-428d-97d6-bc407237d31c'

async function main() {
  // 유저 확인
  const user = await prisma.user.findUnique({ where: { id: USER_ID } })
  if (!user) {
    throw new Error(`User(${USER_ID}) not found. 실제 존재하는 userId로 바꿔주세요.`)
  }

  // 1) Writer 더미 생성 (3명)
  const writerA = await prisma.writer.upsert({
    where: { id: 'w_alex' },
    update: {},
    create: { id: 'w_alex', name: 'Alex Writer' }
  })

  const writerB = await prisma.writer.upsert({
    where: { id: 'w_bora' },
    update: {},
    create: { id: 'w_bora', name: 'Bora Writer' }
  })

  const writerC = await prisma.writer.upsert({
    where: { id: 'w_chang' },
    update: {},
    create: { id: 'w_chang', name: 'Chang Writer' }
  })

  // 2) Background 더미 생성 (5개)
  const bg1 = await prisma.background.upsert({
    where: { id: 'bg_summer_camp' },
    update: {},
    create: {
      id: 'bg_summer_camp',
      name: '여름 바닷가 캠프',
      writerId: writerA.id,
      tags: ['바다', '캠프', '여름'],
      avatarUrl: 'https://picsum.photos/seed/bg1/200/200'
    }
  })

  const bg2 = await prisma.background.upsert({
    where: { id: 'bg_haunted_mansion' },
    update: {},
    create: {
      id: 'bg_haunted_mansion',
      name: '폐가의 비밀',
      writerId: writerA.id,
      tags: ['미스터리', '공포'],
      avatarUrl: 'https://picsum.photos/seed/bg2/200/200'
    }
  })

  const bg3 = await prisma.background.upsert({
    where: { id: 'bg_city_romance' },
    update: {},
    create: {
      id: 'bg_city_romance',
      name: '도시의 로망스',
      writerId: writerB.id,
      tags: ['로맨스', '도시'],
      avatarUrl: 'https://picsum.photos/seed/bg3/200/200'
    }
  })

  const bg4 = await prisma.background.upsert({
    where: { id: 'bg_space_odyssey' },
    update: {},
    create: {
      id: 'bg_space_odyssey',
      name: '우주 탐사일지',
      writerId: writerB.id,
      tags: ['SF', '탐사'],
      avatarUrl: 'https://picsum.photos/seed/bg4/200/200'
    }
  })

  const bg5 = await prisma.background.upsert({
    where: { id: 'bg_hometown' },
    update: {},
    create: {
      id: 'bg_hometown',
      name: '고향의 여름',
      writerId: writerC.id,
      tags: ['힐링', '향수'],
      avatarUrl: 'https://picsum.photos/seed/bg5/200/200'
    }
  })

  // 3) Flow 더미 생성 (각 배경당 한 개씩)
  // 모델명이 Flow가 맞는지, 필드명이 backgroundId/seq/name 등이 맞는지 프로젝트 스키마에 맞춰 수정하세요.
  const fl1 = await prisma.flow.upsert({
    where: { id: 'fl_summer_camp_01' },
    update: {},
    create: { id: 'fl_summer_camp_01', backgroundId: bg1.id, name: 'Act 1', seq: 1 }
  })

  const fl2 = await prisma.flow.upsert({
    where: { id: 'fl_haunted_01' },
    update: {},
    create: { id: 'fl_haunted_01', backgroundId: bg2.id, name: '프롤로그', seq: 1 }
  })

  const fl3 = await prisma.flow.upsert({
    where: { id: 'fl_city_romance_01' },
    update: {},
    create: { id: 'fl_city_romance_01', backgroundId: bg3.id, name: '만남', seq: 1 }
  })

  const fl4 = await prisma.flow.upsert({
    where: { id: 'fl_space_01' },
    update: {},
    create: { id: 'fl_space_01', backgroundId: bg4.id, name: '이륙', seq: 1 }
  })

  const fl5 = await prisma.flow.upsert({
    where: { id: 'fl_hometown_01' },
    update: {},
    create: { id: 'fl_hometown_01', backgroundId: bg5.id, name: '귀향', seq: 1 }
  })

  // 4) OpenBackground 더미 생성 (openedAt 내림차순으로 보이도록 시차 부여)
  const minutesAgo = (m: number) => new Date(Date.now() - m * 60 * 1000)

  // 이미 존재하면 중복 방지용으로 upsert 대신 createMany + skipDuplicates를 사용하려면
  // unique 제약(예: userId+backgroundId) 여부에 맞게 조정하세요.
  await prisma.openBackground.createMany({
    data: [
      {
        userId: USER_ID,
        backgroundId: bg1.id,
        writerId: bg1.writerId,
        flowId: fl1.id,
        openedAt: minutesAgo(5), // 가장 최근
      },
      {
        userId: USER_ID,
        backgroundId: bg2.id,
        writerId: bg2.writerId,
        flowId: fl2.id,
        openedAt: minutesAgo(30),
      },
      {
        userId: USER_ID,
        backgroundId: bg3.id,
        writerId: bg3.writerId,
        flowId: fl3.id,
        openedAt: minutesAgo(90),
      },
      {
        userId: USER_ID,
        backgroundId: bg4.id,
        writerId: bg4.writerId,
        flowId: fl4.id,
        openedAt: minutesAgo(240),
      },
      {
        userId: USER_ID,
        backgroundId: bg5.id,
        writerId: bg5.writerId,
        flowId: fl5.id,
        openedAt: minutesAgo(1440), // 하루 전
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Seed completed for openBackgrounds')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })