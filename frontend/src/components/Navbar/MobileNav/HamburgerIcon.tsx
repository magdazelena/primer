const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
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

export default HamburgerIcon;
