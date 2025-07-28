"use client";
import { createPortal } from "react-dom";
import React from "react";

type PortalDropdownProps = {
  open: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  styles: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

export function PortalDropdown({
  open,
  dropdownRef,
  styles,
  className,
  children,
}: PortalDropdownProps) {
  if (!open) return null;

  return createPortal(
    <div ref={dropdownRef} style={styles} className={className}>
      {children}
    </div>,
    document.body
  );
}
