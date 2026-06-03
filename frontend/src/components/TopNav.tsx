import {
  Header,
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
} from '@carbon/icons-react';

const TopNav = () => {
  return (
    <Header aria-label="Self Talk Psychologist">
      <HeaderName href="/modules" prefix="">
        Self Talk Psychologist
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Help">
          <Help size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Calendar">
          <Calendar size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Chat">
          <Chat size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Calculator">
          <Calculator size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications">
          <Notification size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Profile">
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};

export default TopNav;