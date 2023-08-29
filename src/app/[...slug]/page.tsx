import Image from 'next/image'

export default function Docs({ params }: { params: { slug: string[] } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(params)}

    </main>
  )
}

