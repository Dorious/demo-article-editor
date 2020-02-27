import React, { useContext, useEffect } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { InfinitySpinner } from './Spinner';
import { hex2rgba } from '../../utils';
import { ITheme } from '../../themes';
import { IArticle } from '../../interfaces';
import { AppContext } from '../../App';
import layouts from '../layouts';
import { Input, Icon, Button } from 'antd';
import { setDocumentTitle } from '../../actions';

export interface IArticleProps {
  article: IArticle;
  editMode?: boolean;
}

export const ArticleInfo = styled.section`
  position: absolute;
  z-index: 3;
  min-width: 60%;
  background: ${(props: ThemeProps<ITheme>) => props.theme.paperBackground};
  padding: 10px 10px 10px 20px;
  top: -75px;
  left: 30px;
  box-shadow: 0 10px 20px rgba(0,0,0,.15);
`;

const selectLayout = (id: string) => {
  return layouts[id];
}

const getLayout = (layout: any) => {
  const renderLayout = selectLayout(layout[0]['layout']['id']);
  return renderLayout.render;
}

export const Article: React.FC<IArticleProps> = React.memo(({article, editMode}) => {
  let {
    selectedLayouts
  } = article;

  useEffect(() => {
    const edit = editMode ? 'Edit: ' : '';
    setDocumentTitle(edit + article.name);
    return () => {
      setDocumentTitle();
    }
  }, [article, editMode]);

  return (
    <>
      {editMode ? <ArticleInfo>
        <Icon type="paper-clip" style={{
          fontSize: '40px',
          transform: 'rotate(-90deg)',
          position: 'absolute',
          zIndex: 1,
          top: '32px',
          left: '-22px',
        }}/>
        <Input 
          defaultValue={article.name} 
          addonBefore="Article Name" 
        />
        <Button>Save</Button>
      </ArticleInfo> : null}
      <article data-testid="mainArticle">
        {getLayout(selectedLayouts)(article, editMode)}
      </article>
    </>
  )
});

const DEFAULT_BG = '#fff';

const Paper = styled.div`
  ${({theme}: ThemeProps<ITheme>) => `
    background: ${theme.paperBackground || DEFAULT_BG};
    box-shadow: 0 10px 30px rgba(0,0,0,.15);
    padding: 30px 30px 150px 30px;
    position: relative;
    transition: margin-top 0.25s linear;

    ::after {
      content: ' ';
      position: absolute;
      z-index: 2;
      bottom: -50px;
      left: -30px; 
      right: -30px;
      height: 150px;
      background: linear-gradient(
        0deg,
        ${hex2rgba(theme.bodyBackground || DEFAULT_BG)} 0%,
        ${hex2rgba(theme.bodyBackground || DEFAULT_BG)} 40%, 
        ${hex2rgba(theme.bodyBackground || DEFAULT_BG, 0)} 100%
      );
    }
  `}
`;

const SpinnerContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0; right: 0; left: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: ThemeProps<ITheme>) => hex2rgba(props.theme.paperBackground, 0.8)};

  & > div {
    max-height: 500px;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
  }
`

const Editor: React.FC = () => {
  const [{
    article, loadingArticle, editMode
  }] = useContext(AppContext);

  return <Paper style={editMode ? {marginTop: '100px'} : {}}>
    {loadingArticle ? <SpinnerContainer>
      <div>
        <InfinitySpinner color="#008"/>
      </div>
    </SpinnerContainer> : null}
    {article ? <Article article={article} editMode={editMode} /> : null}
  </Paper>
}

export default Editor;