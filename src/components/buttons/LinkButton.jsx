import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const LinkButton = ({ to, children, ...props }) => {
  return (
    <Button LinkComponent={Link} to={to} {...props}>
      {children}
    </Button>
  );
};

export default LinkButton;
