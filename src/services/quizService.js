// 📍 PUNTO: Persistencia de datos en MongoDB (funciones preparadas para conectar)
export const quizService = {
  // Guardar progreso del quiz
  async saveQuizProgress(progressData) {
    try {
      const response = await fetch('/api/quiz/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData)
      })
      
      if (!response.ok) {
        throw new Error('Error saving quiz progress')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error in saveQuizProgress:', error)
      throw error
    }
  },

  // Obtener progreso del quiz
  async getQuizProgress(userId) {
    try {
      const response = await fetch(`/api/quiz/progress/${userId}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          return null // No hay progreso guardado
        }
        throw new Error('Error fetching quiz progress')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error in getQuizProgress:', error)
      throw error
    }
  },

  // Guardar resultado final del quiz
  async saveQuizResult(resultData) {
    try {
      const response = await fetch('/api/quiz/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData)
      })
      
      if (!response.ok) {
        throw new Error('Error saving quiz result')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error in saveQuizResult:', error)
      throw error
    }
  },

  // Obtener leaderboard
  async getLeaderboard(limit = 50) {
    try {
      const response = await fetch(`/api/quiz/leaderboard?limit=${limit}`)
      
      if (!response.ok) {
        throw new Error('Error fetching leaderboard')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error in getLeaderboard:', error)
      throw error
    }
  },

  // Resetear progreso del quiz
  async resetQuizProgress(userId) {
    try {
      const response = await fetch(`/api/quiz/progress/${userId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Error resetting quiz progress')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error in resetQuizProgress:', error)
      throw error
    }
  },

  // Obtener estadísticas del usuario
  async getUserStats(userId) {
    try {
      const response = await fetch(`/api/quiz/stats/${userId}`)
      
      if (!response.ok) {
        throw new Error('Error fetching user stats')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error in getUserStats:', error)
      throw error
    }
  }
}
