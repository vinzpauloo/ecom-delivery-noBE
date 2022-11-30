import React from 'react'
import { useParams } from 'react-router-dom'

const HistoryStatusContent = (props) => {
    const {id} = useParams();
  return (
    <div>HistoryStatusContent, {id}</div>
  )
}

export default HistoryStatusContent