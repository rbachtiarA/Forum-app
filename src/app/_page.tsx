'use client'
import { useEffect, useState } from "react";

export default function Home() {

    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
     useEffect(() => {
      const fetchStream = async () => {
        const response = await fetch("http://localhost:3000/api/stream");
        const reader = response.body?.getReader()
        const decoder = new TextDecoder("utf-8");

        let done = false
        while(!done) {
          const readable = await reader?.read()
          done = readable!.done
          if(readable?.value) {
            setContent((prev) => prev + decoder.decode(readable.value))
          }
        }
        setLoading(false)
      }

      fetchStream()
     }, [])
  return (
    <div>
      <h1>Streamed Content</h1>
      {loading && <p>loading...</p>}
      <div dangerouslySetInnerHTML={{__html: content}} />
    </div>
  );
}
