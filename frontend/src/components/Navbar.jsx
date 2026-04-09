import { Link, useLocation, useNavigate } from 'react-router-dom'
//import { useEffect } from 'react'
import {
  LayoutDashboard, Calendar, Users, Image,
  Settings, LogOut, Sparkles, UserCircle, Star,
} from 'lucide-react'
import styles from './Navbar.module.css'

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/agendamentos', icon: Calendar, label: 'Agendamentos' },
  { path: '/admin/clientes', icon: Users, label: 'Clientes' },
  { path: '/admin/galeria', icon: Image, label: 'Galeria' },
  { path: '/admin/avaliacoes', icon: Star, label: 'Avaliações' },
  { path: '/admin/funcionarios', icon: UserCircle, label: 'Usuários' },
  { path: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  //useEffect(() => {
   // const isLoggedIn = localStorage.getItem('isAdminLoggedIn')
   // if (!isLoggedIn) {
   //   navigate('/admin/login')
   // }}, [navigate])

  function handleLogout() {
    localStorage.removeItem('isAdminLoggedIn')
    navigate('/admin/login')
  }

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>
          <Sparkles size={20} color="white" />
        </div>
        <div>
          <h1 className={styles.logoTitle}>Nail Design</h1>
          <p className={styles.logoSub}>Admin Panel</p>
        </div>
      </div>

      {/* Menu */}
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

      {/* Sair */}
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