import MenuBar from '@/components/menubar'
import './globals.css'

export const metadata = {
  title: 'Run It',
  description: 'Trabalho 3',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <link href="https://fonts.cdnfonts.com/css/montserrat" rel="stylesheet" />
      </head>
      <body className='min-h-screen'>
        <main className="min-h-screen flex flex-col w-full m-0 p-0">
          <MenuBar />
          <div className='flex-1 flex flex-col p-2'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
