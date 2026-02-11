import React from 'react';
import './Link.css';

export const Link = ({
                         brand = 'anthem',                   // anthem | wellpoint | healthyblue
                         variant = 'internal',               // internal | external | inline | white
                         disabled = false,
                         href = '#',
                         children,
                         leadingIcon = null,
                         trailingIcon = null,
                         ...rest
                     }) => {
    const classes = [
        'link',
        `link--${brand}`,
        `link--${variant}`,
        disabled && 'link--disabled',
    ].filter(Boolean).join(' ');

    return (
        <span className={classes}>
      <a className="link__a" href={disabled ? undefined : href} aria-disabled={disabled} {...rest}>
        {leadingIcon && <span className="link__icon" aria-hidden="true">{leadingIcon}</span>}
          <span className="link__label">{children}</span>
          {trailingIcon && <span className="link__icon" aria-hidden="true">{trailingIcon}</span>}
      </a>
    </span>
    );
};