export const HamburgerIcon = (props: HamburgerIconProps) => {
  return (
    <div
      id="menu-icon"
      className={`${isOpen ? "open" : "closed"}`}
      aria-label="mobile menu"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
