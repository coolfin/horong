'use client'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { MYPAGE_CONSTANT } from '@/constants/mypage/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import DefaultProfile from '@/static/svg/logo-icon.svg'
import ArrowRightIcon from '@/static/svg/mypage/mypage-arrowright-icon.svg'
import ProfileEditIcon from '@/static/svg/mypage/mypage-profile-edit-icon.svg'

type UserDataType = {
  result: {
    nickname: string
    profilePreSignedUrl: string
  }
}

function MyPage() {
  const lang = useLangStore((state) => state.lang)

  const { data: user } = useQuery<UserDataType>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await privateAPI.get('/user')
      return res.data
    },
  })

  const handleDelete = () => {}
  const toggleCommunityAlarm = () => {}
  return (
    <div className="flex h-full w-full flex-col justify-between gap-y-6 bg-grey-80">
      <GlobalHeader pageName={MYPAGE_CONSTANT[lang]['mypage-header']} />
      {/* 메인 콘텐츠 wrapper */}

      <div className="flex grow flex-col gap-y-3">
        {/* 프로필 */}
        <div className="flex w-full flex-col items-center justify-center gap-y-4 pb-2 pt-7">
          {/* 프로필 사진 */}
          <Link
            href="/edit/profile"
            className="relative"
          >
            {user?.result.profilePreSignedUrl ? (
              // <div className="relative px-36">
              <Image
                src={user.result.profilePreSignedUrl}
                alt="profile"
                width={80}
                height={80}
                // layout="responsive"
                className="rounded-full"
                priority
              />
            ) : (
              // 임시
              <DefaultProfile className="h-20 w-20 rounded-full" />
            )}
            <div className="absolute bottom-0 right-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2">
              <ProfileEditIcon />
            </div>
          </Link>

          <div className="flex flex-col items-center justify-center gap-y-1">
            <p className="text-sm text-text-high">
              {user && user.result.nickname}
            </p>
            <Link
              href="/edit/nickname"
              className="flex items-center justify-center text-xs text-text-md"
            >
              {MYPAGE_CONSTANT[lang]['mypage-nickname-edit']}
            </Link>
          </div>
        </div>

        {/* 메뉴 */}
        <div className="flex w-full flex-col items-center justify-center gap-y-2 px-6">
          <Link
            className="flex w-full items-center justify-between border-y border-[rgba(255,255,255,0.1)] px-2 py-4"
            href="/edit/lang"
          >
            <span>{MYPAGE_CONSTANT[lang]['mypage-lang-txt']}</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>

          <button onClick={toggleCommunityAlarm}>
            <span>{MYPAGE_CONSTANT[lang]['mypage-alarm-txt']}</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>

          <Link href="/edit/password">
            <span>{MYPAGE_CONSTANT[lang]['mypage-pw-txt']}</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="flex w-full grow items-center justify-start px-6 text-xs text-warning"
      >
        {MYPAGE_CONSTANT[lang]['mypage-delete-txt']}
      </button>
    </div>
  )
}

export default MyPage
