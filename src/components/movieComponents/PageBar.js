import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from './MovieActions'

export default function PagesBar({totalPages, currentPageNum}) {
  const dispatch = useDispatch();
  const handelPrev = () => {
    console.log('clicked')
    dispatch(Actions.setPrevPage())
  }
  const handelNext = () => {
    dispatch(Actions.setNextPage())
  }
  
  return (
    <div className="pagesBar">
      <button onClick={handelPrev}>Prev</button>
      <span>
        {currentPageNum}/{totalPages}
      </span>
      <button onClick={handelNext}>Next</button>
    </div>
  );
}