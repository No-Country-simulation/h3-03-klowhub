'use client'

import { useEffect, useRef } from 'react'

interface DonutChartProps {
    totalRevenue: number;
    totalCommissions: number;
    revenueColor: string;
    commissionColor: string;
    title: string;
}

export default function DonutChart({ totalRevenue, totalCommissions, revenueColor, commissionColor, title }: DonutChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const formatRevenueInK = () => {
        return `${(totalRevenue / 1000).toFixed(1)}K` // Convert totalRevenue to 'K' format with one decimal
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size to be square
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.8
        canvas.width = size
        canvas.height = size

        // Chart configuration
        const centerX = size / 2
        const centerY = size / 2
        const radius = size * 0.45
        const lineWidth = radius * 0.2
        const startAngle = -Math.PI / 2 // Start from the top
        const gapAngle = Math.PI / 36 // 5-degree gap

        // Background color (matching the container background)
        const backgroundColor = '#353e4b' // Tailwind's bg-gray-900

        // Function to draw an arc with angular ends
        const drawAngularArc = (startAngle: number, endAngle: number, color: string) => {
            const innerRadius = radius - lineWidth / 2
            const outerRadius = radius + lineWidth / 2

            ctx.beginPath()
            ctx.arc(centerX, centerY, innerRadius, startAngle, endAngle)
            ctx.arc(centerX, centerY, outerRadius, endAngle, startAngle, true)
            ctx.closePath()
            ctx.fillStyle = color
            ctx.fill()
        }

        // Draw background circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = '#353e4b'
        ctx.lineWidth = lineWidth
        ctx.stroke()

        // Calculate total amount (revenue + commissions)
        const totalAmount = totalRevenue + totalCommissions
        const revenuePercentage = totalRevenue / totalAmount
        const commissionPercentage = totalCommissions / totalAmount

        // Draw segments
        const segments = [
            { color: revenueColor, percentage: revenuePercentage }, // Revenue segment
            { color: commissionColor, percentage: commissionPercentage }  // Commission segment
        ]

        let currentAngle = startAngle
        segments.forEach((segment) => {
            const segmentAngle = (Math.PI * 2 * segment.percentage) - gapAngle
            drawAngularArc(currentAngle + gapAngle / 2, currentAngle + segmentAngle + gapAngle / 2, segment.color)
            currentAngle += segmentAngle + gapAngle
        })

        // Draw center content
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'

        // Calculate the proportional value of 10px based on canvas size
        const px4 = 10 * (size / canvas.width)

        // Title
        ctx.font = `${size * 0.05}px Inter`
        ctx.fillText(title, centerX, centerY - size * 0.1 + px4) // Move 4px closer

        // Amount after commissions (revenue - commissions)
        const amountAfterCommissions = totalRevenue - totalCommissions;
        ctx.font = `bold ${size * 0.08}px Inter`
        ctx.fillText(`$${amountAfterCommissions.toLocaleString()}`, centerX, centerY + size * 0.1 - px4)

    }, [totalRevenue, totalCommissions, revenueColor, commissionColor, title])

    return (
        <div className="w-[242px] h-[242px] p-0 bg-[#353e4b] flex items-center justify-center relative">
            <canvas
                ref={canvasRef}
                className="max-w-full max-h-full"
            />
            {totalRevenue !== 0 &&
                <div className='absolute right-1 top-0'>
                    <div className="bg-black flex py-2 px-3 items-center gap-2 rounded-lg relative">
                        <div
                            className={`rounded-full w-[10px] h-[10px]`}
                            style={{ backgroundColor: revenueColor }}
                        ></div>
                        <span className="z-[10] text-lg">{formatRevenueInK()}</span>
                        <div
                            className="absolute top-[100%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-black"
                        ></div>
                    </div>
                </div>}
        </div>
    )
}