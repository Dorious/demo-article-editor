/**
 * Description of article object
 * Not finished only those stuff I needed
 */

export interface IElement<Value> {
  elementType: string;
  value?: Value;
  values?: Value[];
}

export interface ILeadImage {
  source: string;
  width: number;
  height: number;
  transform?: any;
}

export interface IMainImageValue {
  leadImage: {
    renditions: {
      lead: ILeadImage;
      card: ILeadImage;
      default: ILeadImage;
    }
  };
  leadImageCaption: IElement<string>
}

export interface IArticle {
  id: string;
  name: string;
  selectedLayouts: any[];
  tags: string[];
  elements: {
    body: IElement<string>;
    heading: IElement<any>;
    mainImage: IElement<IMainImageValue>;
    date: IElement<any>;
    author: IElement<any>;
  };
}