import { Link } from 'react-router'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <Link to="/corazon/presion-alta">Presion alta</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer