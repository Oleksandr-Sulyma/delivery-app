'use client';
import { Layout } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

export default function AppHeader() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Shop', href: '/' },
    { name: 'Shopping Cart', href: '/cart' },
    { name: 'History', href: '/history' },
  ];

  return (
    <Header style={{ 
      background: '#fff', 
      display: 'flex', 
      padding: '0 30px', 
      height: '64px',
      alignItems: 'center',
    }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
<nav style={{ display: 'flex', alignItems: 'center' }}>
        {navLinks.map((link, index) => (
          <div key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
            <Link 
              href={link.href} 
              style={{ 
                textDecoration: 'none', 
                // Блакитний для звичайних, темно-синій для активного
                color: pathname === link.href ? '#053a8f' : '#1890ff', 
                fontWeight: pathname === link.href ? '500' : '400',
                fontSize: '16px',
                padding: '0 5px',
                transition: 'all 0.2s ease'
              }}
            >
              {link.name}
            </Link>
            
            {/* Розділювач (залишив темним, як ти просив раніше) */}
            {index < navLinks.length - 1 && (
              <span style={{ 
                margin: '0 15px', 
                color: '#595959', 
                fontWeight: '300',
                fontSize: '18px',
                userSelect: 'none' 
              }}>|</span>
            )}
          </div>
        ))}
      </nav>
        </div>
      
    </Header>
  );
}