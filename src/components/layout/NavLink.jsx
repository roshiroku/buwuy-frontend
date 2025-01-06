import LinkButton from '../buttons/LinkButton';

const NavLink = ({ to, small = 'small', sx, children, ...props }) => {
  return (
    <LinkButton
      to={to}
      size={small}
      sx={{
        px: 1,
        borderRadius: 2,
        textTransform: 'none',
        color: 'currentcolor',
        ...sx
      }}
      color="link"
      {...props}
    >
      {children}
    </LinkButton>
  );
};

export default NavLink;
