import React from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../StateContext'

const EmailMsg = () => {

  const {backToLogin} = useStateContext()

  useEffect(()=>{
    backToLogin()
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
    <div className="max-w-xl px-5 text-center">
    <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Check your inbox or spam</h2>
    <p className="mb-2 text-lg text-zinc-500">A temporary passowrd has been sent to your email address. Please make sure to follow the instructions given.</p>
  </div>
</div>
  )
}

export default EmailMsg