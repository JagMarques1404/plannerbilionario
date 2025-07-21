"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  TrendingUp,
  Award,
  BookOpen,
  Video,
  Users,
  Clock,
  Eye,
  Heart,
} from "lucide-react"
import { ProductListSkeleton } from "@/components/loading-skeleton"

export default function MarketplacePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const products = [
    {
      id: 1,
      name: "Curso Completo de Análise Técnica",
      description: "Aprenda a analisar gráficos e identificar tendências do mercado financeiro",
      price: 297.0,
      originalPrice: 497.0,
      category: "course",
      rating: 4.9,
      students: 2847,
      duration: "12 horas",
      level: "Intermediário",
      instructor: "Carlos Mendoza",
      image: "/investment-ebook-cover.png",
      tags: ["Análise Técnica", "Gráficos", "Trading"],
      discount: 40,
      featured: true,
    },
    {
      id: 2,
      name: "E-book: Guia do Investidor Iniciante",
      description: "Manual completo para quem está começando no mundo dos investimentos",
      price: 47.0,
      originalPrice: 97.0,
      category: "ebook",
      rating: 4.8,
      students: 5234,
      pages: 150,
      level: "Iniciante",
      instructor: "Ana Silva",
      image: "/market-analysis-report.png",
      tags: ["Iniciante", "Investimentos", "Básico"],
      discount: 52,
      featured: false,
    },
    {
      id: 3,
      name: "Mentoria Individual - 1 Hora",
      description: "Sessão personalizada com especialista em investimentos",
      price: 150.0,
      originalPrice: 200.0,
      category: "mentorship",
      rating: 5.0,
      students: 89,
      duration: "1 hora",
      level: "Todos os níveis",
      instructor: "Julius Mentor",
      image: "/mentorship-session.png",
      tags: ["Mentoria", "Personalizado", "1:1"],
      discount: 25,
      featured: true,
    },
    {
      id: 4,
      name: "Calculadora Avançada de ROI",
      description: "Ferramenta profissional para calcular retorno sobre investimento",
      price: 97.0,
      originalPrice: 147.0,
      category: "tool",
      rating: 4.7,
      students: 1456,
      level: "Intermediário",
      instructor: "Tech Team",
      image: "/investment-calculator.png",
      tags: ["Ferramenta", "ROI", "Cálculos"],
      discount: 34,
      featured: false,
    },
    {
      id: 5,
      name: "Masterclass: Dividendos e FIIs",
      description: "Workshop intensivo sobre investimentos em renda passiva",
      price: 197.0,
      originalPrice: 297.0,
      category: "workshop",
      rating: 4.9,
      students: 892,
      duration: "4 horas",
      level: "Intermediário",
      instructor: "Roberto Farias",
      image: "/dividends-masterclass.png",
      tags: ["Dividendos", "FIIs", "Renda Passiva"],
      discount: 34,
      featured: true,
    },
    {
      id: 6,
      name: "Comunidade Premium VIP",
      description: "Acesso exclusivo ao grupo de investidores avançados",
      price: 97.0,
      originalPrice: null,
      category: "community",
      rating: 4.8,
      students: 234,
      level: "Avançado",
      instructor: "Comunidade Julius",
      image: "/placeholder-yurft.png",
      tags: ["Comunidade", "VIP", "Networking"],
      discount: 0,
      featured: false,
    },
  ]

  const categories = [
    { value: "all", label: "Todos os Produtos", count: products.length },
    { value: "course", label: "Cursos", count: products.filter((p) => p.category === "course").length },
    { value: "ebook", label: "E-books", count: products.filter((p) => p.category === "ebook").length },
    { value: "mentorship", label: "Mentorias", count: products.filter((p) => p.category === "mentorship").length },
    { value: "tool", label: "Ferramentas", count: products.filter((p) => p.category === "tool").length },
    { value: "workshop", label: "Workshops", count: products.filter((p) => p.category === "workshop").length },
    { value: "community", label: "Comunidades", count: products.filter((p) => p.category === "community").length },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "students":
        return b.students - a.students
      default: // popular
        return b.featured ? 1 : -1
    }
  })

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  if (isLoading) {
    return <ProductListSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Marketplace Premium</h1>
          <p className="text-base text-gray-600 mt-1">
            Descubra cursos, ferramentas e mentorias para acelerar sua jornada financeira
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">🔥 Ofertas Limitadas</Badge>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar produtos, cursos, ferramentas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none"
            />
          </div>

          {/* Categoria */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-100">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Ordenação */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-100">
              <SelectItem value="popular">Mais Populares</SelectItem>
              <SelectItem value="rating">Melhor Avaliados</SelectItem>
              <SelectItem value="students">Mais Vendidos</SelectItem>
              <SelectItem value="price-low">Menor Preço</SelectItem>
              <SelectItem value="price-high">Maior Preço</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Produtos em Destaque */}
      {selectedCategory === "all" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">🌟 Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((p) => p.featured)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  featured={true}
                />
              ))}
          </div>
        </div>
      )}

      {/* Lista de Produtos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            {selectedCategory === "all"
              ? "Todos os Produtos"
              : categories.find((c) => c.value === selectedCategory)?.label}
          </h2>
          <span className="text-base text-gray-600">
            {sortedProducts.length} produto{sortedProducts.length !== 1 ? "s" : ""} encontrado
            {sortedProducts.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => toggleFavorite(product.id)}
              featured={false}
            />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <Card className="bg-white shadow-lg rounded-xl p-12 border border-gray-100 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum produto encontrado</h3>
            <p className="text-base text-gray-600 mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-4 py-2 rounded-lg"
            >
              Limpar Filtros
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

// Componente do Card de Produto
function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  featured,
}: {
  product: any
  isFavorite: boolean
  onToggleFavorite: () => void
  featured: boolean
}) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "course":
        return <Video className="h-4 w-4" />
      case "ebook":
        return <BookOpen className="h-4 w-4" />
      case "mentorship":
        return <Users className="h-4 w-4" />
      case "tool":
        return <TrendingUp className="h-4 w-4" />
      case "workshop":
        return <Award className="h-4 w-4" />
      case "community":
        return <Users className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "course":
        return "Curso"
      case "ebook":
        return "E-book"
      case "mentorship":
        return "Mentoria"
      case "tool":
        return "Ferramenta"
      case "workshop":
        return "Workshop"
      case "community":
        return "Comunidade"
      default:
        return "Produto"
    }
  }

  return (
    <Card
      className={`bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 overflow-hidden ${featured ? "ring-2 ring-yellow-400" : ""}`}
    >
      {/* Imagem do Produto */}
      <div className="relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />

        {/* Badge de Desconto */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Badge Featured */}
        {featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
            ⭐ Destaque
          </div>
        )}

        {/* Botão Favorito */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFavorite}
          className={`absolute bottom-3 right-3 p-2 rounded-full ${
            isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-gray-600"
          } hover:scale-110 transition-all duration-200`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-6">
        {/* Categoria e Nível */}
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            {getCategoryIcon(product.category)}
            {getCategoryLabel(product.category)}
          </Badge>
          <Badge className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{product.level}</Badge>
        </div>

        {/* Título e Descrição */}
        <h3 className="text-xl font-medium text-gray-700 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-base text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        {/* Instrutor */}
        <p className="text-sm text-gray-500 mb-3">
          Por <span className="font-medium text-gray-700">{product.instructor}</span>
        </p>

        {/* Avaliação e Estatísticas */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="font-medium text-gray-800">{product.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{product.students.toLocaleString()}</span>
          </div>
          {product.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{product.duration}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Preço e Botão */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">R$ {product.price.toFixed(2).replace(".", ",")}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>
          <Button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Comprar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
