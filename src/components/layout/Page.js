import { Fragment } from 'react';

export const Page = ({  children }) =>{
  return (
    <Fragment>
      <section className="layout-content">{children}</section>
    </Fragment>
  );
}

// <Fragment></Fragment>
// <></>


