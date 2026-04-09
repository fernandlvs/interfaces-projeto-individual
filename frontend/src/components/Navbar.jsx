import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  Calendar, Users, Image,
  LogOut, Sparkles, UserCircle, Star,
} from 'lucide-react'
import styles from './Navbar.module.css'

const menuItems = [
  { path: '/admin/agendamentos', icon: Calendar, label: 'Agendamentos' },
  { path: '/admin/clientes', icon: Users, label: 'Clientes' },
  { path: '/admin/galeria', icon: Image, label: 'Galeria' },
  { path: '/admin/avaliacoes', icon: Star, label: 'Avaliações' },
  { path: '/admin/usuarios', icon: UserCircle, label: 'Usuários' },
  { path: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>
          <Sparkles size={20} color="white" />
        </div>
        <div>
          <h1 className={styles.logoTitle}>Nail Design</h1>
          <p className={styles.logoSub}>Admin Panel</p>
        </div>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className={styles.logoutArea}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}

export default Navbar