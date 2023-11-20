import emStyled, { CreateStyledComponent } from "@emotion/styled"

import Theme from "types/Theme"
import CreateStyled, { StyledTags, SxProps } from "types/CreateStyled"
import stylesProps from "styles/stylesProps";

export interface StyledProps extends SxProps {
  theme?: Theme;
}

export const mediaSx = ({ theme, sx: rootSx }: StyledProps) => {
  if (!theme) return {}
  const sx = typeof rootSx === 'function' ? rootSx(theme) : rootSx;
  return {
    ...sx,
    ...(sx?.xs && {
      [theme!.breakpoints.up('xs')]: sx.xs,
    }),
    ...(sx?.sm && {
      [theme!.breakpoints.up('sm')]: sx.sm,
    }),
    ...(sx?.md && {
      [theme!.breakpoints.up('md')]: sx.md,
    }),
    ...(sx?.lg && {
      [theme!.breakpoints.up('lg')]: sx.lg,
    }),
    ...(sx?.xl && {
      [theme!.breakpoints.up('xl')]: sx.xl,
    }),
  };
};

export const createBaseStyled = () => {
  return (tag: Parameters<CreateStyled<Theme>>[0], options?: Parameters<CreateStyled<Theme>>[1]) => {

    const shouldForwardProp = (propsName: string) => {
      if (propsName === 'sx' || propsName === "as" || stylesProps.some(v => v === propsName)) return false
      if (options?.shouldForwardProp) return options?.shouldForwardProp(propsName)
      return true
    }

    return (...args: Parameters<CreateStyledComponent<StyledProps>>) => {
      return emStyled(tag, { ...options, shouldForwardProp })(...args, mediaSx)
    }
  }
}

const createStyled = () => {
  const styled = createBaseStyled()
  Object.keys(emStyled).forEach(key => {
    // @ts-ignore
    styled[key] = styled(key)
  })

  return styled as CreateStyled<Theme> & StyledTags<Theme>
}

export default createStyled