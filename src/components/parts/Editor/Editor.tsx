import React, { useContext, ReactNode } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { InfinitySpinner } from '../Spinner';
import { hex2rgba } from '../../../utils';
import { ITheme } from '../../../themes';
import { AppContext } from '../../../App';
import layouts from '../../layouts';

export interface IArticleProps {
  article: any;
}

export const ArticleInfo = styled.section`

`

const selectLayout = (id: string) => {
  return layouts[id];
}

const getLayout = (layout: any) => {
  const renderLayout = selectLayout(layout[0]['layout']['id']);
  return renderLayout.render;
}

export const Article: React.FC<IArticleProps> = React.memo(({article}) => {
  let {
    selectedLayouts
  } = article;

  return (
    <>
      <ArticleInfo role="">
        Grr
      </ArticleInfo>
      <section>
        {getLayout(selectedLayouts)(article)}
      </section>
    </>
  )
});

const Paper = styled.div`
  background: ${(props: ThemeProps<ITheme>) => props.theme.paperBackground};
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
  padding: 30px 30px 150px 30px;
  position: relative;

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
      ${(props: ThemeProps<ITheme>) => hex2rgba(props.theme.bodyBackground)} 0%, 
      ${(props: ThemeProps<ITheme>) => hex2rgba(props.theme.bodyBackground)} 40%, 
      ${(props: ThemeProps<ITheme>) => hex2rgba(props.theme.bodyBackground, 0)} 100%
    );
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  z-index: 1;
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
    article, loadingArticle
  }, dispatch] = useContext(AppContext);

  return <Paper>
    {loadingArticle ? <SpinnerContainer>
      <div>
        <InfinitySpinner color="#008"/>
      </div>
    </SpinnerContainer> : null}
    {article ? <Article article={article} /> : null}
  </Paper>
}

export default Editor;