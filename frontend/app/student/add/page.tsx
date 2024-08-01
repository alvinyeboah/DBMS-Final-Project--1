import React from 'react'
import StudentManager from '../dashboard/components/StudentAdder'

type Props = {}

function page({}: Props) {
  return (
    <div className='z-40'><StudentManager/></div>
  )
}

export default page