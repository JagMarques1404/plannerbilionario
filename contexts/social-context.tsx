"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  username: string
  avatar?: string
  level: number
  xp: number
  tokens: number
  followers: number
  following: number
  isFollowing?: boolean
}

interface Post {
  id: string
  userId: string
  user: User
  content: string
  type: "text" | "investment" | "achievement" | "milestone"
  metadata?: any
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
  createdAt: Date
}

interface Group {
  id: string
  name: string
  description: string
  avatar?: string
  memberCount: number
  isPrivate: boolean
  category: string
  isMember?: boolean
  createdAt: Date
}

interface SocialContextType {
  // Users
  currentUser: User | null
  users: User[]
  followUser: (userId: string) => Promise<void>
  unfollowUser: (userId: string) => Promise<void>

  // Posts
  posts: Post[]
  createPost: (content: string, type?: Post["type"], metadata?: any) => Promise<void>
  likePost: (postId: string) => Promise<void>
  unlikePost: (postId: string) => Promise<void>

  // Groups
  groups: Group[]
  joinGroup: (groupId: string) => Promise<void>
  leaveGroup: (groupId: string) => Promise<void>

  // Loading states
  loading: boolean
  refreshData: () => Promise<void>
}

const SocialContext = createContext<SocialContextType | undefined>(undefined)

export function SocialProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeData()
  }, [])

  const initializeData = async () => {
    setLoading(true)

    // Simular dados do usuário atual
    const mockCurrentUser: User = {
      id: "current-user",
      name: "João Silva",
      username: "joao.silva",
      avatar: "/placeholder.svg?height=40&width=40",
      level: 15,
      xp: 12500,
      tokens: 2500,
      followers: 234,
      following: 189,
    }

    // Simular outros usuários
    const mockUsers: User[] = [
      {
        id: "user-1",
        name: "Maria Santos",
        username: "maria.santos",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 22,
        xp: 18900,
        tokens: 3200,
        followers: 456,
        following: 234,
        isFollowing: true,
      },
      {
        id: "user-2",
        name: "Pedro Costa",
        username: "pedro.costa",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 18,
        xp: 15600,
        tokens: 2800,
        followers: 321,
        following: 198,
        isFollowing: false,
      },
      {
        id: "user-3",
        name: "Ana Oliveira",
        username: "ana.oliveira",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 25,
        xp: 22100,
        tokens: 4100,
        followers: 678,
        following: 345,
        isFollowing: true,
      },
    ]

    // Simular posts
    const mockPosts: Post[] = [
      {
        id: "post-1",
        userId: "user-1",
        user: mockUsers[0],
        content: "Acabei de completar minha primeira semana de investimentos consistentes! 🚀 #InvestindoComFoco",
        type: "milestone",
        metadata: { streak: 7, category: "investments" },
        likes: 23,
        comments: 5,
        shares: 2,
        isLiked: true,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "post-2",
        userId: "user-2",
        user: mockUsers[1],
        content: "Dica do dia: Diversificação é a chave! Não coloque todos os ovos na mesma cesta. 🥚📈",
        type: "text",
        likes: 45,
        comments: 12,
        shares: 8,
        isLiked: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: "post-3",
        userId: "user-3",
        user: mockUsers[2],
        content: 'Conquistei o badge "Investidor Consistente"! 🏆 Próxima meta: 30 dias seguidos!',
        type: "achievement",
        metadata: { achievementId: "consistent-investor", badge: "Investidor Consistente" },
        likes: 67,
        comments: 18,
        shares: 15,
        isLiked: true,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
    ]

    // Simular grupos
    const mockGroups: Group[] = [
      {
        id: "group-1",
        name: "Investidores Iniciantes",
        description: "Grupo para quem está começando no mundo dos investimentos",
        avatar: "/placeholder.svg?height=40&width=40",
        memberCount: 1234,
        isPrivate: false,
        category: "Educação",
        isMember: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: "group-2",
        name: "Fundos Imobiliários",
        description: "Discussões sobre FIIs e investimentos imobiliários",
        avatar: "/placeholder.svg?height=40&width=40",
        memberCount: 856,
        isPrivate: false,
        category: "Investimentos",
        isMember: false,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      },
      {
        id: "group-3",
        name: "Traders Avançados",
        description: "Estratégias avançadas de trading e análise técnica",
        avatar: "/placeholder.svg?height=40&width=40",
        memberCount: 432,
        isPrivate: true,
        category: "Trading",
        isMember: false,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    ]

    // Simular delay de carregamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setCurrentUser(mockCurrentUser)
    setUsers(mockUsers)
    setPosts(mockPosts)
    setGroups(mockGroups)
    setLoading(false)
  }

  const followUser = async (userId: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, isFollowing: true, followers: user.followers + 1 } : user)),
    )

    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, following: prev.following + 1 } : null))
    }
  }

  const unfollowUser = async (userId: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, isFollowing: false, followers: user.followers - 1 } : user)),
    )

    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, following: prev.following - 1 } : null))
    }
  }

  const createPost = async (content: string, type: Post["type"] = "text", metadata?: any) => {
    if (!currentUser) return

    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      content,
      type,
      metadata,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      createdAt: new Date(),
    }

    setPosts((prev) => [newPost, ...prev])
  }

  const likePost = async (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isLiked: true, likes: post.likes + 1 } : post)),
    )
  }

  const unlikePost = async (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isLiked: false, likes: post.likes - 1 } : post)),
    )
  }

  const joinGroup = async (groupId: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, isMember: true, memberCount: group.memberCount + 1 } : group,
      ),
    )
  }

  const leaveGroup = async (groupId: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, isMember: false, memberCount: group.memberCount - 1 } : group,
      ),
    )
  }

  const refreshData = async () => {
    await initializeData()
  }

  const value: SocialContextType = {
    currentUser,
    users,
    followUser,
    unfollowUser,
    posts,
    createPost,
    likePost,
    unlikePost,
    groups,
    joinGroup,
    leaveGroup,
    loading,
    refreshData,
  }

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
}

export function useSocial() {
  const context = useContext(SocialContext)
  if (context === undefined) {
    throw new Error("useSocial must be used within a SocialProvider")
  }
  return context
}
