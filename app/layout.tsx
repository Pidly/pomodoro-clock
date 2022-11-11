export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html style={{height: '100%'}}>
      <head></head>
      <body style={{backgroundColor: 'black', color: 'white', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {children}
      </body>
    </html>
  )
}
