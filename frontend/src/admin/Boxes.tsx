import React, { FunctionComponent } from 'react';

export const InnerBox: FunctionComponent<{name: string}> = (props) => {

  const {name = '', children} = props;

  return (
    <div className="sub-area">
      <span className="area-heading">{name}</span>

      {children}

    </div>
    );
}

export const SectionBox: FunctionComponent<{name: string}> = (props) => {

  const {name = '', children} = props;

  return (
    <section>
      <h2>{name}</h2>

      {children}

    </section>
    );
}

