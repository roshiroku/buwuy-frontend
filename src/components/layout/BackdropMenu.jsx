import { useState } from 'react';
import { Menu } from '@mui/material';

const BackdropMenu = ({
  anchorEl,
  open,
  onClose,
  elevation,
  sx: _sx = {},
  marginThreshold = 0,
  transitionDuration = 225,
  transitionFunction = 'cubic-bezier(0.4, 0, 0.2, 1)',
  TransitionComponent,
  children
}) => {
  const {
    paper,
    root,
    p,
    padding,
    maxWidth,
    width,
    backgroundColor,
    backdropFilter,
    borderRadius,
    zIndex,
    boxShadow,
    ...style
  } = _sx;
  const [sx, setSx] = useState(style);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => onClose() || setSx({ ...sx, backgroundColor: '', backdropFilter: '' })}
      slotProps={{
        paper: {
          elevation,
          sx: {
            '& > .MuiMenu-list': { p: p ?? padding },
            maxWidth,
            width,
            borderRadius,
            boxShadow,
            ...paper
          }
        },
        root: { sx: { zIndex, ...root } }
      }}
      marginThreshold={marginThreshold}
      TransitionComponent={TransitionComponent}
      transitionDuration={transitionDuration}
      onTransitionEnter={() => setSx({ ...sx, backgroundColor, backdropFilter })}
      sx={{ transition: `all ${transitionDuration}ms ${transitionFunction}`, ...sx }}
    >
      {children}
    </Menu>
  );
};

export default BackdropMenu;
