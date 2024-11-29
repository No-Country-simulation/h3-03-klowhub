"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import Image from "next/image"

interface CartItem {
    id: number
    title: string
    image: string
    platform: string
    sector: string
    rating: number
    reviews: number
    verified: boolean
}

export const CartComponent = () => {

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const fetchCartItems = async () => {
        return new Promise<CartItem[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        title: "Control de Inventario para retail",
                        image: "/temp/imgs/course-image.png",
                        platform: "Plataforma: Power Apps",
                        sector: "Sector: Industrial",
                        rating: 5,
                        reviews: 74,
                        verified: true,
                    },
                ])
            }, 1000)
        })
    }

    useEffect(() => {
        fetchCartItems().then((data) => setCartItems(data))
    }, [])

    return (
        <div className="mx-auto mt-8 min-h-screen">
            <div className="grid gap-6 md:grid-cols-[1fr,300px]">
                <div className="space-y-4">
                    {cartItems.length === 0 ? (
                        <p className="text-white">Cargando carrito...</p>
                    ) : (
                        cartItems.map((item) => (
                            <Card key={item.id} className="text-white">
                                <CardContent className="flex flex-col md:flex-row gap-4 p-4 h-full">
                                    <div className="relative h-44 w-44 flex-shrink-0 overflow-hidden rounded-md">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between flex-1">
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-zinc-400">{item.platform}</p>
                                        <p className="text-sm text-zinc-400">{item.sector}</p>
                                        <div className="mt-2 flex items-center gap-1">
                                            {Array.from({ length: item.rating }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                            <span className="text-sm text-zinc-400">
                                                ({item.reviews})
                                            </span>
                                            {item.verified && (
                                                <span className="ml-2 rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">
                                                    Verificado
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
                <Card className="text-white">
                    <CardContent className="p-4">
                        <h2 className="mb-4 text-lg font-semibold">Resumen</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Subtotal</span>
                                <span>$5,071</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Cargo de servicio</span>
                                <span>$130</span>
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm text-zinc-400">
                                    Cupón de descuento
                                </span>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Ingrese cupón"
                                        className="text-white bg-transparent"
                                    />
                                    <Button variant="outline">Ingresar</Button>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Cupón HotSale</span>
                                <span>25%</span>
                            </div>
                            <Separator className="bg-zinc-800" />
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>$5,201</span>
                            </div>
                            <div className="mt-10">
                                <span className="text-xs font-thin">Selecciona un método de pago</span>
                            </div>
                            <div className="flex justify-between gap-2 h-14">
                                <Image
                                    src="/temp/imgs/stripe.svg"
                                    alt="Stripe"
                                    width={70}
                                    height={30}
                                    className="rounded-md bg-white p-2"
                                />
                                <Image
                                    src="/temp/imgs/mercado-pago.svg"
                                    alt="PayPal"
                                    width={70}
                                    height={30}
                                    className="rounded-md bg-white p-2"
                                />
                                <Image
                                    src="/temp/imgs/eth.svg"
                                    alt="Crypto"
                                    width={80}
                                    height={30}
                                    className="rounded-md bg-white p-2"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
