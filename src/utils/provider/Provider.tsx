import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import QueryProvider from './query-provider'

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <QueryProvider>
            { children }
        </QueryProvider>
    </ThemeProvider>
  )
}
