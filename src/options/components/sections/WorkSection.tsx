import { useRecoilState } from 'recoil'
import WordCards from '../commonComponent/WorkCard'
import { clickedKeyword, isJobs } from '../../atoms'
import { ArrowLeftIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { keywordProps } from '../../../util/types'
import { compareArrays } from '../../../util'
import { useEffect, useRef } from 'react'

const WorkSection = () => {
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  const { allJobs, getNewComingJobs, removeSeenJobs } = useOpJobs()
  const backRef = useRef<HTMLButtonElement>(null)

  let jobs = allJobs.find((keyword: keywordProps) => keyword.keyword === clickKeyword.keyword)?.jobs

  const removeSeen = async () => {
    const newCurrentJobs: any = await getNewComingJobs()
    if (newCurrentJobs) {

      const newJobs: any = compareArrays(jobs, newCurrentJobs)

      removeSeenJobs(newJobs)
    }
  }

  const clickToGoBack = (e: any) => {
    if (e.key === "Backspace") {
      backRef.current?.click()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", clickToGoBack)

    return () => {
      document.removeEventListener("keydown", clickToGoBack)
    }
  }, [])

  return (
    <div className="max-w-[1300px]">
      <div className="text-2xl flex items-center justify-between">
        <div
          className="flex gap-x-4 hover:cursor-pointer group"
          onClick={() => setIsClicked((prev) => !prev)}
        >
          <span className="mt-1">
            <ArrowLeftIcon className="group-hover:text-gray-400" />
          </span>
          <button ref={backRef} onClick={() => removeSeen()} className="group-hover:text-gray-400">
            Go Back
          </button>
        </div>
        <div className="flex gap-x-2">
          <span className="p-1">{clickKeyword.keyword}</span>
        </div>
      </div>

      <div id="keywords" className="flex items-center mt-3 justify-center">
        <WordCards />
      </div>
    </div>
  )
}
export default WorkSection
