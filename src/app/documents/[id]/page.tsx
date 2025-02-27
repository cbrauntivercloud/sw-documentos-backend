"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"

interface Document {
  id: number
  title: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
}

export default function DocumentDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [document, setDocument] = useState<Document | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No authentication token found. Please log in.")
          return
        }

        const response = await axios.get(`${API_BASE_URL}/documents/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDocument(response.data)
      } catch (error) {
        console.error("Error fetching document:", error)
        setError("Failed to fetch document. Please try again later.")
      }
    }

    fetchDocument()
  }, [params.id])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!document) {
    return <div>Loading...</div>
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-6">{document.title}</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Categoría</h2>
          <p>{document.category}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Contenido</h2>
          <p className="whitespace-pre-wrap">{document.content}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Fecha de Creación</h2>
          <p>{new Date(document.createdAt).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Última Actualización</h2>
          <p>{new Date(document.updatedAt).toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => router.push(`/documents/${document.id}/edit`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Editar Documento
          </button>
          <button
            onClick={() => router.push("/documents")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Volver a la Lista
          </button>
        </div>
      </div>
    </div>
  )
}

