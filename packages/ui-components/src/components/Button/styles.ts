import { css, cx } from 'emotion';
import { ButtonSize } from '../../types/button-size.type';
import { Color } from '../../types/colors.type';

export const baseButtonStyle = css`
  border-radius: 4px;
  font-weight: bold;
  color: var(--color-white);
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
`;

export const primaryButtonStyle = (color: Color) => {
  const bgColor = `--color-${color}`;

  return css`
    background-color: var(${bgColor});
    & svg {
      fill: var(--color-white);
    }
    &:hover {
      background-color: var(${bgColor}-light);
    }
    &:active {
      background-color: var(${bgColor}-dark);
    }
  `;
};

export const outlinedButtonStyle = (color: Color) => {
  const bgColor = `--color-${color}`;

  return css`
    border: 1px solid;
    border-color: var(${bgColor});
    color: var(${bgColor});
    & svg {
      fill: var(${bgColor});
    }
    &:hover {
      background-color: var(${bgColor}-light);
      color: var(--color-white);
      & svg {
        fill: var(--color-white);
      }
    }
    &:active {
      background-color: var(${bgColor}-dark);
      color: var(--color-white);
    }
  `;
};

export const disabledButtonStyle = css`
  opacity: 0.75;
  pointer-events: none;
`;

export const buttonSize = (size: ButtonSize) => {
  const sizeMap = {
    small: '0.625rem',
    medium: '0.75rem',
    regular: '0.875rem',
    large: '1.25rem',
  };
  const paddingMap = {
    small: 'px-4 py-1',
    medium: 'px-4 py-2',
    regular: 'px-4 py-2',
    large: 'px-4 py-2',
  };
  return cx(
    css`
      font-size: ${sizeMap[size]};
    `,
    paddingMap[size],
  );
};

export const linkButtonStyle = (color: Color) => {
  const bgColor = `--color-${color}`;

  return css`
    border: none;
    color: var(${bgColor});
    text-transform: none;
    padding: 0 !important;
  `;
};
