import { NextResponse } from "next/server"

export async function GET() {
    const stream = new ReadableStream({
        start(controller) {
            // push part 1
            controller.enqueue("<div><h1>Part 1</h1></div>")

            // 1 second timeout part 2
            setTimeout(() => {
                controller.enqueue('<div><p>Part 2</p></div>')
            }, 1000)

            // 2 second timeout part 3
            setTimeout(() => {
                controller.close()
            }, 2000)
        }
    })

    return new NextResponse(stream, {
        headers: { "Content-Type": "text/html"},
    })
}