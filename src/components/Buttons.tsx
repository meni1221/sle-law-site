import type { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  href?: string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  label?: string;
  children: ReactNode;
}

function classes(base: string, extra?: string): string {
  return extra ? `${base} ${extra}` : base;
}

export function PrimaryButton({ to, href, onClick, type, className, label, children }: ButtonProps) {
  const cls = classes('btn btn-primary', className);
  if (to) {
    return (
      <Link className={cls} to={to} onClick={onClick} aria-label={label}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick} aria-label={label}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} type={type ?? 'button'} onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}

export function SecondaryButton({ to, href, onClick, type, className, label, children }: ButtonProps) {
  const cls = classes('btn btn-secondary', className);
  if (to) {
    return (
      <Link className={cls} to={to} onClick={onClick} aria-label={label}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick} aria-label={label}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} type={type ?? 'button'} onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}
