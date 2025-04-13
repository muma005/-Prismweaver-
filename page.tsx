import DataCleaningInterface from "@/components/data-cleaning-interface"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Data Cleaning Workflow</h1>
      <DataCleaningInterface />
    </main>
  )
}
