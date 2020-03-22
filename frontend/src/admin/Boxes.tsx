import React, { FunctionComponent } from 'react';

export const InnerBox: FunctionComponent<{name: string, inactive?: boolean}> = (props) => {

  const {name = '', inactive = false, children} = props;

  return (
    <div className={'sub-area' + (inactive ? ' inactive' : '')}>
      <span className="area-heading">{name}</span>

      {children}

    </div>
    );
}

export const SectionBox: FunctionComponent<{name: string, inactive?: boolean}> = (props) => {

  const {name = '', inactive = false, children} = props;

  return (
    <section className={inactive ? 'inactive' : ''}>
      <h2>{name}</h2>

      {children}

    </section>
    );
}

