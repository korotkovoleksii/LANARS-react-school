import { ChangeEventHandler } from 'react';

export interface IFABProp {
  title: string;
  handlerChange: ChangeEventHandler<HTMLInputElement>;
}

export interface IPageTemplateProps {
  header: JSX.Element;
  body: JSX.Element;
  fab?: IFABProp;

}
