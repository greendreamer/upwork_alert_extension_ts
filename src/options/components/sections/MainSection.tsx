import AddKeyWordSection from '../commonComponent/AddKeyWord'
import { useState } from 'react'
import KeyWordsSection from './KeyWordsSection'
import WorkSection from './WorkSection'
const MainSection: React.FC = () => {
  const [showKeyWord, setShowKeyword] = useState(false)
  return (
    <div className="container flex flex-col justify-center p-4 mx-auto">
      <AddKeyWordSection />
      <div className="py-4 flex flex-col gap-y-4">
        {/* <KeyWordsSection /> */}
        <WorkSection />
      </div>
    </div>
  )
}

export default MainSection