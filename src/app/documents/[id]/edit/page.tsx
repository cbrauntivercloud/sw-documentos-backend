"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"

export default function EditDocument({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
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
        const document = response.data
        setTitle(document.title)
        setCategory(document.category)
        setContent(document.content)
      } catch (error) {
        console.error("Error fetching document:", error)
        setError("Failed to fetch document. Please try again later.")
      }
    }

    fetchDocument()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No authentication token found. Please log in.")
        return
      }

      await axios.patch(
        `${API_BASE_URL}/documents/${params.id}`,
        { title, category, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      router.push(`/documents/${params.id}`)
    } catch (error) {
      console.error("Error updating document:", error)
      setError("Failed to update document. Please try again later.")
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-6">Editar Documento</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Título
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Título del documento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Categoría
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Categoría del documento"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Contenido
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            placeholder="Contenido del documento"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Actualizar Documento
          </button>
          <button
            onClick={() => router.push(`/documents/${params.id}`)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

