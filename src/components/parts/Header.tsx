import React, { useContext } from 'react';
import styled, { CSSProperties } from 'styled-components';
import Spinner from './Spinner';
import { AppContext } from '../../App';
import { Switch, Button, Dropdown, Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';

const FONT_COLOR = '#aaa';

const Logo = styled.a`
  border-right: 1px solid #ccc;

  @media (max-width: 1280px) {
    margin-left: 10px;
  }

  ::after {
    content: '<>';
    color: #999;
    font-family: monospace;
    font-size: 30px;
    font-weight: bold;
    padding-right: 10px;
    transition: color 0.25s ease;
    display: block;
    height: 100%;
    line-height: 37px;
  }
  
  :hover {
    &::after {
      color: #666;
    }
  }
  
`;

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  height: 40px;
`;

const CurrentDoc = styled.span`
  font-size: 24px;
  color: ${FONT_COLOR};
  margin-left: 10px;

  ::before {
    content: '/ ';
  }

  :first-child {
    ::before {
      display: none;
    }
  }
`;

const Right = styled.div`
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  display: flex;
`;

export interface IBreadcrumb {
  articles: any[];
  loadingArticles: boolean;
  onMenuClick: (param: ClickParam) => void;
  id?: string;
}

export const Breadcrumb: React.FC<IBreadcrumb> = React.memo(({
  articles, loadingArticles, onMenuClick, id
}) => {
  if(loadingArticles === false && articles.length) {
    const menu = (
      <Menu onClick={onMenuClick}>
        {articles.map((article: any, index: number) => {
          const style: CSSProperties = id === article.id ? {
            fontWeight: 'bold'
          } : {};

          return ( 
            <Menu.Item 
              key={index} 
              data-article={article}
              style={style}
            >
              <Icon type="file-word" />
              {article.name}
            </Menu.Item>
          )
        })}
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button>
          Published articles <Icon type="down" />
        </Button>
      </Dropdown>
    )
  }

  return <>
    <Spinner width={16} style={{verticalAlign: 'middle'}} color={FONT_COLOR} /> Loading...
  </>
});

const Header: React.FC = () => {
  const [{
    theme, editMode, articles, loadingArticles, router, article
  }, dispatch] = useContext(AppContext);

  const light = theme === 'light';

  return <Container>
    <Logo 
      title="The best React editor on earth!"
      href="/"
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        router.push('/');
      }}
    />
    <div>
      <CurrentDoc>
        <Breadcrumb 
          articles={articles} 
          loadingArticles={loadingArticles} 
          id={router ? router.location.qs.id : null}
          onMenuClick={(info) => {
            let article = info.item.props['data-article'];
            if(router) router.push(`/?id=${article.id}`);
          }}
        />
      </CurrentDoc>
      {article ? <CurrentDoc>{article.name}</CurrentDoc> : null}
    </div>
    <Right>
      Edit:&nbsp;&nbsp;<Switch 
        checked={editMode}
        onChange={() => dispatch({
          type: 'toggleEdit'
        })}
      />&nbsp;&nbsp;&nbsp;
      Light:&nbsp;&nbsp;<Switch 
        checked={light}
        onChange={(checked: boolean) => dispatch({
          type: 'changeTheme',
          payload: checked ? 'light' : 'dark'
        })}
      />
    </Right>
  </Container>
}

export default Header;