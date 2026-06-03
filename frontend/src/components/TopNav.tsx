import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react';
import {
  Help,
  Calendar,
  Chat,
  Calculator,
  Notification,
  UserAvatar,
  Search,
  ChevronDown,
} from '@carbon/icons-react';

const TopNav = () => {
  return (
    <Header aria-label="Self Talk Psychologist">
      <HeaderMenuButton
        aria-label="Open menu"
        isCollapsible
        style={{ color: '#ffffff' }}
      />

      <HeaderName href="/modules" prefix="">
        Self Talk Psychologist
      </HeaderName>


      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#393939',
        padding: '0 0.75rem',
        height: '32px',
        flex: 1,
        maxWidth: '400px',
        gap: '0.5rem',
        margin: '0 1rem',
        flexShrink: 0,
      }}>
        <input
          placeholder="Search resources and products"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#c6c6c6',
            fontSize: '14px',
            width: '100%',
          }}
        />
        <Search size={16} color="#8d8d8d" />
      </div>

      <div style={{
        width: '1px',
        height: '20px',
        background: '#525252',
        flexShrink: 0,
      }} />

      <a href="/catalog" style={{
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        padding: '0 1.5rem',
      }}>
        Catalog
      </a>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        color: '#ffffff',
        fontSize: '14px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        padding: '0 1.5rem',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000',
        height: '100%',
      }}>
        Select Campus <ChevronDown size={14} />
      </div>


      <span style={{
        color: '#ffffff',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        padding: '0 1.5rem',
      }}>
        Dr. B Ramesh
      </span>

      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Help"><Help size={20} /></HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Calendar"><Calendar size={20} /></HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Chat"><Chat size={20} /></HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Calculator"><Calculator size={20} /></HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications"><Notification size={20} /></HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Profile"><UserAvatar size={20} /></HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};

export default TopNav;