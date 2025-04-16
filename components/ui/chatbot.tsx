"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageCircle, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Message {
    id: number
    text: string
    sender: "user" | "bot"
    timestamp: Date
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi there! I'm the Orange Concrete Services assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!inputValue.trim()) return

        // Add user message
        const userMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            sender: "user",
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        // Simulate bot response after a delay
        setTimeout(() => {
            const botResponse = generateBotResponse(inputValue)
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: botResponse,
                sender: "bot",
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 1000)
    }

    // Generate bot response based on user input
    const generateBotResponse = (userInput: string): string => {
        const input = userInput.toLowerCase()

        // FAQ responses
        if (input.includes("price") || input.includes("cost") || input.includes("quote") || input.includes("estimate")) {
            return "Pricing depends on several factors including the size, complexity, and location of your project. We offer free quotes - please call us at 0400 000 000 or use our quote request form for a personalized estimate."
        }

        if (input.includes("time") || input.includes("how long") || input.includes("duration") || input.includes("schedule")) {
            return "Project timelines vary based on size and complexity. Small residential projects like driveways typically take 3-5 days, while larger commercial projects may take several weeks. We'll provide a detailed timeline during your consultation."
        }

        if (input.includes("service") || input.includes("offer") || input.includes("provide") || input.includes("do you")) {
            return "We offer a wide range of concrete services including driveways, patios, pool surrounds, foundations, commercial flooring, decorative concrete, and concrete restoration. You can view our full service list on our Services page."
        }

        if (input.includes("location") || input.includes("area") || input.includes("where") || input.includes("service area")) {
            return "We primarily serve Orange and surrounding areas including Bathurst, Dubbo, and other nearby locations. Contact us to confirm if we service your specific location."
        }

        if (input.includes("warranty") || input.includes("guarantee")) {
            return "We stand behind our work with a comprehensive warranty. Residential projects typically come with a 2-year workmanship warranty, while commercial projects include a 1-year warranty. Material warranties vary by product."
        }

        if (input.includes("material") || input.includes("concrete type") || input.includes("mix")) {
            return "We use high-quality concrete mixes tailored to each project's specific requirements. Options include standard gray concrete, exposed aggregate, colored concrete, and stamped concrete. We can discuss the best option for your project during consultation."
        }

        if (input.includes("preparation") || input.includes("prepare")) {
            return "Site preparation is crucial for a successful concrete project. This typically involves clearing the area, establishing proper drainage, creating formwork, and installing reinforcement. Our team handles all preparation work as part of our service."
        }

        if (input.includes("maintenance") || input.includes("maintain") || input.includes("care")) {
            return "Concrete requires minimal maintenance. Regular cleaning with a pressure washer and resealing every 2-3 years will keep your concrete looking great. For decorative concrete, we recommend annual resealing to preserve the finish."
        }

        if (input.includes("contact") || input.includes("reach") || input.includes("call") || input.includes("email")) {
            return "You can reach us by phone at 0400 000 000, by email at info@paulrudd.com, or by using the contact form on our website. Our office hours are Monday to Friday, 7am to 5pm."
        }

        if (input.includes("thank") || input.includes("thanks") || input.includes("appreciate")) {
            return "You're welcome! Is there anything else I can help you with today?"
        }

        if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
            return "Hello! How can I assist you with your concrete project today?"
        }

        if (input.includes("bye") || input.includes("goodbye")) {
            return "Thank you for chatting with us! If you have more questions later, feel free to come back or contact our team directly."
        }

        // Default response
        return "I'm not sure I understand. Could you please rephrase your question? Or you can ask about our services, pricing, project timelines, or contact information."
    }

    // Format timestamp
    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 z-50"
                aria-label="Open chat"
            >
                <MessageCircle className="h-6 w-6" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 sm:w-96 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <Card className="shadow-xl border-gray-200">
                        <CardHeader className="bg-orange-500 text-white p-4 flex flex-row justify-between items-center rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                <h3 className="font-semibold">Concrete Assistant</h3>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-orange-600 rounded-full h-8 w-8 p-0"
                                aria-label="Close chat"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {/* Messages Container */}
                            <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user"
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-white dark:bg-gray-700 shadow"
                                                }`}
                                        >
                                            <p className="text-sm">{message.text}</p>
                                            <p className={`text-xs mt-1 ${message.sender === "user"
                                                    ? "text-orange-100"
                                                    : "text-gray-500 dark:text-gray-400"
                                                }`}>
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow max-w-[80%]">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 animate-bounce"></div>
                                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 animate-bounce delay-75"></div>
                                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 animate-bounce delay-150"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Type your message..."
                                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                />
                                <Button
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}
