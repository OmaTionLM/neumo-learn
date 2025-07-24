// 📍 PUNTO: Hook para Firebase Auth (preparado para Google login)
import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aquí conectarás con Firebase Auth
    // Por ahora simulo un usuario para testing
    const mockUser = {
      uid: 'test-user-123',
      displayName: 'Usuario de Prueba',
      email: 'test@example.com',
      photoURL: 'https://via.placeholder.com/40'
    }
    
    setTimeout(() => {
      setUser(mockUser)
      setLoading(false)
    }, 1000)
  }, [])

  const signInWithGoogle = async () => {
    // Implementar login con Google
    console.log('Sign in with Google')
  }

  const signOut = async () => {
    // Implementar logout
    setUser(null)
  }

  return {
    user,
    loading,
    signInWithGoogle,
    signOut
  }
}
