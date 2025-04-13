"use client"

import type React from "react"

// This is a simplified version of the toast component
import { useState, useEffect } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

let toastId = 0
const toasts: ToastProps[] = []
let setToastsState: React.Dispatch<React.SetStateAction<ToastProps[]>> | null = null

export function toast(props: ToastProps) {
  const id = toastId++
  const newToast = { ...props, id }

  toasts.push(newToast)
  if (setToastsState) {
    setToastsState([...toasts])
  }

  // Auto-remove toast after 3 seconds
  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
      if (setToastsState) {
        setToastsState([...toasts])
      }
    }
  }, 3000)
}

export function Toaster() {
  const [toastsState, setToasts] = useState<ToastProps[]>([])

  useEffect(() => {
    setToastsState = setToasts
    return () => {
      setToastsState = null
    }
  }, [])

  return (
    <div className="fixed top-0 right-0 p-4 z-50 flex flex-col gap-2">
      {toastsState.map((toast, index) => (
        <div
          key={index}
          className={`p-4 rounded-md shadow-md ${
            toast.variant === "destructive" ? "bg-red-100 border border-red-200" : "bg-white border border-gray-200"
          }`}
        >
          {toast.title && <h3 className="font-medium">{toast.title}</h3>}
          {toast.description && <p className="text-sm text-gray-600">{toast.description}</p>}
        </div>
      ))}
    </div>
  )
}
