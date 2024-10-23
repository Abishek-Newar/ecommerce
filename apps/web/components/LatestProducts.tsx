'use client'
import React, { useEffect } from 'react'
import { BACKEND_URL } from '../config/config'

const LatestProducts = () => {
    useEffect(()=>{
        async function dataFetch(){
            try{
                const response = await fetch(`${BACKEND_URL}user/getProducts`,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        page: 1,
                        limit:6,
                    })
                })
                const data = await response.json()
                console.log(data)
            }catch(e){
                console.log(e)
            }
        }
        dataFetch()
    })
  return (
    <div>

    </div>
  )
}

export default LatestProducts