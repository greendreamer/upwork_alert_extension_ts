import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, jobsState, keywords } from '../options/atoms'
import { useEffect, useState } from 'react'
import { jobsProps, keywordProps } from '../util/types'
import useBgJobs from './use-bg-job'

const useOpJobs = () => {
  const [allJobs, setallJobs] = useRecoilState(allJobsState)
  const [keys, setKeywords] = useRecoilState(keywords)
  const { getBgLocalJobs, getBgKeywords } = useBgJobs()

  useEffect(() => {
    getLocalJobs()
  }, [])

  const getLocalJobs = () => {
    chrome.storage.local.get('jobsByKeyword', (res) => {
      setallJobs(res.jobsByKeyword)
    })
  }

  const setLocalKeywords = async (keyword: string, rssLink: string) => {
    getBgKeywords().then((keywords: any) => {
      let arr = keys || []
      if (arr?.filter((item: keywordProps) => item.rssLink === rssLink).length === 0){
        chrome.storage.local.set({ keywords: [...arr, { keyword, rssLink }] }).then(()=>{
          getBgKeywords().then((keywords:any)=>{
            setKeywords(keywords)
          })
        })
      }
    })
  }

  const deleteLocalJobs = (keyword: string) => {
    getBgKeywords().then((keywords:any)=>{
      let filteredKeywords=keywords.filter((a:any)=>a.keyword!==keyword)
      chrome.storage.local.set({keywords:filteredKeywords}).then(()=>{
        getBgKeywords().then((keywords: any) => {
          setKeywords(keywords)
        })
      });
    })

    getBgLocalJobs().then((jobsByKeyword: any) => {
      console.log(jobsByKeyword,'jobs aaya')
      let filteredJobs = jobsByKeyword.filter((a: any) => a.keyword !== keyword)
      console.log(keyword,'word')
      console.log(filteredJobs, 'jobs')
      chrome.storage.local.set({ jobsByKeyword: filteredJobs }).then(() => {
        getBgLocalJobs().then((jobsByKeyword: any) => {
          setallJobs(jobsByKeyword)
        })
      })
    })
  }

  const setLocalJobs = async (keyword: string, rssLink?: string) => {
      const ans = await getAllJobsData({ keyword, rssLink })
      getBgLocalJobs().then((allJobs: any) => {
        let prevJobs = allJobs || []
        console.log(prevJobs,'prev jobs')
        if (prevJobs.filter((item: keywordProps) => item.rssLink === rssLink).length === 0) {
          chrome.storage.local.set({
            jobsByKeyword: [...prevJobs, { jobs: ans, rssLink: rssLink, keyword: keyword }],
          }).then(() => {
            getBgLocalJobs().then((jobsByKeyword: any) => {
              console.log(jobsByKeyword, 'jobs after merge')
              setallJobs(jobsByKeyword)
            })
          })
        }
      })
  }

  const viewJobsHandler = (keyword: keywordProps) => {
    chrome.storage.local.set({
      jobsByKeyword: allJobs.map((a) => {
        if (a.jobs) {
          return {
            ...a,
            jobs: a.jobs.map((job) => ({
              ...job,
              __seen: true,
            })),
          }
        } else {
          return a
        }
      }),
    })
    getLocalJobs()
  }

  return { getLocalJobs, setLocalJobs, viewJobsHandler, allJobs, deleteLocalJobs, setLocalKeywords }
}

export default useOpJobs
