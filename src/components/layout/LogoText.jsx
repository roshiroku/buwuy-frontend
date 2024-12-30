import Logo from "./Logo";

const LogoText = ({ size = '48px' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: size, fontWeight: 600, fontSize: size }}>
      BU <Logo style={{ flexShrink: 0 }} /> UY
    </div>
  );
};

export default LogoText;
