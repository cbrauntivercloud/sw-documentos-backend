"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"

interface Document {
  id: number
  title: string
  category: string
  createdAt: string
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No authentication token found. Please log in.")
          return
        }

        const response = await axios.get(`${API_BASE_URL}/documents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDocuments(response.data)
      } catch (error) {
        console.error("Error fetching documents:", error)
        setError("Failed to fetch documents. Please try again later.")
      }
    }

    fetchDocuments()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No authentication token found. Please log in.")
        return
      }

      await axios.delete(`${API_BASE_URL}/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDocuments(documents.filter((doc) => doc.id !== id))
    } catch (error) {
      console.error("Error deleting document:", error)
      setError("Failed to delete document. Please try again later.")
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Documentos</h1>
        <Link href="/documents/new" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Nuevo Documento
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((document) => (
              <tr key={document.id}>
                <td className="px-6 py-4 whitespace-nowrap">{document.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{document.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(document.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/documents/${document.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Ver
                  </Link>
                  <Link href={`/documents/${document.id}/edit`} className="text-green-600 hover:text-green-900 mr-4">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(document.id)} className="text-red-600 hover:text-red-900">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

