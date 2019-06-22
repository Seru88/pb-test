import styled, { ThemeProvider } from 'styled-components';

import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const StyledButton = styled.button`
  outline: none;
  transition: ${({ theme }) =>
    theme.transitions.create(['background-color', 'border', 'color'])};
  background-color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.main : 'white'};
  border-radius: 25px;
  border: 2px solid;
  border-color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.main : 'black'};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  padding: 0 10px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
    cursor: pointer;
`;

export default ({ children, selected, onClick, width, height }) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Typography
        component={StyledButton}
        selected={selected}
        onClick={onClick}
        width={width}
        height={height}
      >
        {children}
      </Typography>
    </ThemeProvider>
  );
};
