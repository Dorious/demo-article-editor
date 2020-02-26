import React from 'react';
import { IArticle } from '../../interfaces';
import MainImage from './elements/MainImage';
import styled from 'styled-components';

const ArticleHeader = styled.header`
  position: relative;
  & h1 {
    font-size: 40px;
  }
  & h1, & section > span {
    color: #fff;
    background: rgba(0,0,0,.4);
    display: inline-block;
    padding: 0 10px;
    margin-right: 10px;
  }
`

const ArticleInfo = styled.span`
  position: absolute;
  bottom: 30px;
  z-index: 1;
`

const DesignArticleLayout = (article: IArticle, editMode: boolean) => {
  const { elements } = article;
  const {
    heading, body, author, date, mainImage
  } = elements;

  return (
    <article>
      <ArticleHeader>
        <ArticleInfo>
          <h1 
            contentEditable={editMode}
            dangerouslySetInnerHTML={{__html: heading.value}}
          ></h1>
          <section>
            {author.value ? <span>&copy; {author.value}</span> : null}
            {date.value ? <span>{new Date(date.value).toLocaleString()}</span> : null}
          </section>
        </ArticleInfo>
        <MainImage image={mainImage} />
      </ArticleHeader>
      <div
        contentEditable={editMode}
        dangerouslySetInnerHTML={{__html: body.values ? body.values.join('') : '<p>Start your text here</p>'}} 
      />
    </article>
  )
}

export default DesignArticleLayout;