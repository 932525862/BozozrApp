import React, { useEffect } from 'react'
import { useFetchOne } from '../../../hooks/useFetchOne';

const MessagesForm = ({notId, refetch}) => {
    const { data } = useFetchOne({
        key: [`notification/${notId}`,],
        url: `notification/${notId}`,
      });

      useEffect(() => {
        refetch()
      }, [])

      console.log(data);
      
  return (
    <div>MessagesForm</div>
  )
}

export default MessagesForm