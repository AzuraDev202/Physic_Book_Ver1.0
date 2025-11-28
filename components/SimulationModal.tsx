// components/SimulationModal.tsx
'use client'

import { useEffect } from 'react'

interface SimulationModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

export default function SimulationModal({
    isOpen,
    onClose,
    title,
    children
}: SimulationModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <span className="text-2xl">×</span>
                    </button>
                </div>
                <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}