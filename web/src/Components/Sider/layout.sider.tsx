import { useState } from 'react';
import { Menu, Layout, MenuProps } from 'antd';
import sliderLogo from '../../Assets/Images/pan-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './layout.sider.scss';
import * as Icon from 'react-bootstrap-icons';
import {
  AppstoreOutlined,
  CompassOutlined,
  DashboardOutlined,
  HomeOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
  FallOutlined,
  CloudOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { LayoutSiderProps } from '@undp/carbon-library';

const { Sider } = Layout;
const { SubMenu } = Menu;

type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  label: React.ReactNode;
} | null;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LayoutSider = (props: LayoutSiderProps) => {
  const { selectedKey } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { i18n, t } = useTranslation(['nav']);

  const items: MenuItem[] = [
    getItem(t('nav:dashboard'), 'dashboard', <DashboardOutlined />),
    getItem(t('nav:programmes'), 'programmeManagement/viewAll', <AppstoreOutlined />),
    getItem(t('nav:ndcActions'), 'ndcManagement/viewAll', <Icon.Clipboard2Data />),
    getItem(t('nav:investments'), 'investmentManagement/viewAll', <Icon.Cash />),
    getItem(t('nav:transfers'), 'creditTransfers/viewAll', <Icon.ArrowLeftRight />),
    getItem(t('nav:companies'), 'companyManagement/viewAll', <ShopOutlined />),
    getItem(t('nav:users'), 'userManagement/viewAll', <UserOutlined />),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    navigate('/' + e.key);
  };

  return (
    <Sider
      width={240}
      className="layout-sider-container"
      breakpoint={collapsed ? undefined : 'lg'}
      collapsed={collapsed}
    >
      <div className="layout-sider-div-container">
        <div
          className="layout-sider-heading-container"
          onClick={() => navigate('/dashboard', { replace: true })}
        >
          <div className="logo">
            <img src={sliderLogo} alt="slider-logo" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ display: 'flex' }}>
                <div className="title">{collapsed ? '' : ''}</div>
                <div className="title-sub">{collapsed ? '' : ''}</div>
              </div>
              <div className="country-name mt-4">
                {process.env.REACT_APP_COUNTRY_NAME || 'CountryX'}
              </div>
            </div>
          )}
          {collapsed && (
            <div className="country-flag">
              <img
                alt="country flag"
                src={
                  process.env.REACT_APP_COUNTRY_FLAG_URL ||
                  'https://carbon-common-dev.s3.amazonaws.com/flag.png'
                }
              />
            </div>
          )}
        </div>
        <div className="layout-sider-menu-container">
          <Menu
            theme="light"
            selectedKeys={[selectedKey ? selectedKey : 'dashboard']}
            mode="inline"
            onClick={onClick}
          >
            {items.map((item) => (
              <Menu.Item
                key={item?.key}
                icon={item?.icon}
                className={
                  item?.key === 'ndcManagement/viewAll' ||
                  item?.key === 'investmentManagement/viewAll'
                    ? 'custom-padding-left'
                    : ''
                }
              >
                <Link to={`/${item?.key}`}>{item?.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
      <div
        className="toggle-nav-btn"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <Icon.ArrowRight /> : <Icon.ArrowLeft />}
      </div>
    </Sider>
  );
};

export default LayoutSider;
