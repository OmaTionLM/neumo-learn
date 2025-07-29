import { collection, addDoc, getDocs, query, orderBy, limit, where } from "firebase/firestore"
import { db } from "../../firebase.config"

export const saveQuizResult = async (quizResult) => {
  try {
    const docRef = await addDoc(collection(db, "quiz_results"), quizResult)
    console.log("Quiz result saved with ID: ", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("Error saving quiz result: ", error)
    throw error
  }
}

export const getTopResults = async (limitCount = 10) => {
  try {
    // Consulta simplificada para evitar error de índices compuestos
    const q = query(collection(db, "quiz_results"), orderBy("score", "desc"), limit(limitCount))

    const querySnapshot = await getDocs(q)
    const results = []

    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    // Ordenar por timestamp en el cliente si es necesario
    results.sort((a, b) => {
      if (a.score === b.score) {
        // Si tienen el mismo score, ordenar por timestamp
        const timeA = a.timestamp?.seconds || a.timestamp?.getTime?.() / 1000 || 0
        const timeB = b.timestamp?.seconds || b.timestamp?.getTime?.() / 1000 || 0
        return timeB - timeA // Más reciente primero
      }
      return b.score - a.score // Score más alto primero
    })

    return results
  } catch (error) {
    console.error("Error getting top results: ", error)
    throw error
  }
}

export const getUserResults = async (userId) => {
  try {
    const q = query(collection(db, "quiz_results"), where("userId", "==", userId), orderBy("timestamp", "desc"))

    const querySnapshot = await getDocs(q)
    const results = []

    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    return results
  } catch (error) {
    console.error("Error getting user results: ", error)
    throw error
  }
}
