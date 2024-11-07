import dompurify from 'dompurify'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import ConfirmModal from '@/features/community/components/confirmModal/index.tsx'
import OptionModal from '@/features/community/components/optionModal/index.tsx'
import useModal from '@/features/community/hooks/useModal/index.tsx'
import { PostPromise } from '@/features/community/types/post/index.ts'
import useUserId from '@/hooks/useUserId.ts'
import HorongSVG from '@/static/svg/common/common-horong.svg'
import MenuIcon from '@/static/svg/community/community-menu-icon.svg'
interface PostContentProps {
  data: PostPromise
}

function PostContent({ data }: PostContentProps) {
  const { loginUserId } = useUserId()
  const sanitizer = dompurify.sanitize
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)

  const handleCloseConfirmModal = () => {
    handleModalClose()
    setIsOpenConfirmModal(false)
  }
  const handleOpenConfirmModal = () => {
    handleModalClose()
    setIsOpenConfirmModal(true)
  }

  const { isModalOpen, portalElement, handleModalClose, handleModalOpen } =
    useModal()

  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <OptionModal
              handleModalClose={handleModalClose}
              handleConfirmModal={handleOpenConfirmModal}
              handleUpdateOpen={() => alert('todo')}
              // todo
            />,
            portalElement,
          )
        : null}
      {isOpenConfirmModal && portalElement
        ? createPortal(
            <ConfirmModal
              handleModalClose={handleCloseConfirmModal}
              handleDelete={() => alert('todo')}
            />,
            portalElement,
          )
        : null}

      <div className="flex flex-col gap-y-4">
        {/* user info */}
        <div className="flex gap-x-2 py-1">
          {/* todo: profile image `*/}
          <div className="h-[2.875rem] w-[2.875rem] shrink-0">
            <HorongSVG className="h-full w-full" />
          </div>
          <div className="flex grow flex-col gap-y-1 px-2">
            <span className="font-bold">{data.nickname}</span>

            <span className="text-xs opacity-60">2024/10/31 12:02</span>
          </div>
          <div className="flex shrink-0 items-center">
            {loginUserId === data.userId ? (
              <button
                type="button"
                onClick={() => handleModalOpen()}
              >
                <MenuIcon />
              </button>
            ) : (
              <button className="rounded-2xl border border-text-disabled px-2 py-1 text-2xs text-text-disabled">
                DM전송
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-sm font-bold">{data.title}</h2>
        <p className="text-xs">
          {
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizer(`${data.contents}`),
              }}
            />
          }
        </p>
      </div>
    </>
  )
}

export default PostContent
