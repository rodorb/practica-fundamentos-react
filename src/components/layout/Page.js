import { Fragment } from 'react';

export const Page = ({ title, children }) =>{
  return (
    <Fragment>
      <section className="layout-content">{children}</section>
    </Fragment>
  );
}

// <Fragment></Fragment>
// <></>


