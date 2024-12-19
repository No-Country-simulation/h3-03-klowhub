'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, List, Send } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface Message {
    id: string
    user: {
        name: string
        avatar?: string
        role: 'student' | 'teacher'
    }
    content: string
    timestamp: string
}

export function Chat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            user: {
                name: 'Alternative',
                role: 'teacher',
                avatar: '/temp/imgs/profile-mini.png'
            },
            content: 'Asistencia y respuestas a tus preguntas durante el curso para asegurarte de que entiendas cada concepto.',
            timestamp: 'Hace 2 meses'
        },
        {
            id: '2',
            user: {
                name: 'Estudiante',
                role: 'student',
                avatar: '/temp/imgs/avatar.png'
            },
            content: 'Asistencia y respuestas a tus preguntas durante el curso para asegurarte de que entiendas cada concepto.',
            timestamp: 'Hace 2 meses'
        }
    ])
    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = () => {
        if (!newMessage.trim()) return

        const message: Message = {
            id: Date.now().toString(),
            user: {
                name: 'Estudiante',
                role: 'student',
                avatar: '/temp/imgs/avatar.png'
            },
            content: newMessage,
            timestamp: 'Ahora'
        }

        setMessages([...messages, message])
        setNewMessage('')
    }

    return (
        <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3">
                        <Avatar>
                            <AvatarImage src={message.user.avatar} />
                            <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{message.user.name}</span>
                                <span className="text-xs text-gray-400">{message.timestamp}</span>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-3 text-sm">
                                {message.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-800 p-4 space-y-4">
                <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe tu consulta o comentario"
                    className="min-h-[100px] bg-gray-800 border-gray-700"
                />
                <div className="flex items-center justify-between">
                    <ToggleGroup type="multiple" className="bg-gray-800 p-1 rounded-md">
                        <ToggleGroupItem value="bold" aria-label="Toggle bold">
                            <Bold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Toggle italic">
                            <Italic className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="list" aria-label="Toggle list">
                            <List className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Button onClick={handleSendMessage} className="bg-primary">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    )
}

