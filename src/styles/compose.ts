import { flatten } from 'flat';
import Theme, { BreakpointsVariant, FlattenColor, WithBreakpoints } from 'types/Theme';
import { StylesProps, extractColorStyle, extractSpaceStyle, extractBaseStyle, sortendPropsMap, isBreakpointsVariant, isSortendProps, isSpaceVariants, isSpaceStylesPropsName, isColorVariants, isColorStylesPropsName, isBaseStylesPropsName } from 'styles/stylesProps';
import { CSSObject, CSSProperties } from '@emotion/serialize';

interface ComposeProps extends StylesProps {
  theme?: Theme
}

type ComposeFx = (rootProps: ComposeProps) => CSSObject;

const handleBreakpoints = <T extends string | number>(props: ComposeProps, propsValue: WithBreakpoints<T> | undefined, styleFromPropsValue: (value: T, breakpoints?: BreakpointsVariant) => CSSObject) => {
  const theme = props.theme
  if (!theme || !propsValue) return {}
  if (typeof propsValue === 'object') {
    const reduceInit: Record<string, CSSObject> = {}
    if (Array.isArray(propsValue)) {
      return propsValue.reduce((acc, value, index) => {
        const breakpoint = theme.breakpoints.keys[index];
        const mediaKey = theme.breakpoints.up(breakpoint)
        acc[mediaKey] = styleFromPropsValue(value, breakpoint)
        return acc
      }, reduceInit)
    }
    return Object.keys(propsValue).reduce((acc, breakpoint) => {
      if (isBreakpointsVariant(theme, breakpoint)) {
        const value = propsValue[breakpoint]
        if (value) {
          const mediaKey = theme.breakpoints.up(breakpoint)
          acc[mediaKey] = styleFromPropsValue(value, breakpoint)
        }
      }
      return acc;
    }, reduceInit)
  }
  return styleFromPropsValue(propsValue)
}

const handleSortendProps = (key: string, value: string): CSSObject => {
  const cssMap = new Map<keyof CSSProperties, string>()
  if (isSortendProps(key)) {
    const propsMap = sortendPropsMap[key]
    propsMap.forEach(styleKey => cssMap.set(styleKey, value))
    return Object.fromEntries(cssMap)
  }
  return { [key]: value }
}

const mergeStyles = (styles: CSSObject[]): CSSObject => {
  const init: CSSObject = {}
  return styles.reduce((acc, style) => {
    Object.keys(style).forEach(key => {
      const props = style[key]
      if (typeof props === 'object') {
        const prevProps = acc[key]
        acc[key] = { ...(typeof prevProps === 'object' && prevProps as CSSObject), ...props }
        return
      }
      acc[key] = props
    })
    return acc;
  }, init)
}

export const base: ComposeFx = (rootProps) => {
  const { theme, ...props } = rootProps;
  const baseProps = extractBaseStyle(props)

  if (!theme) return {}

  const handleValue = (value: string | number) => value.toString()

  return mergeStyles(Object.keys(baseProps).map((key) => {
    if (!isBaseStylesPropsName(key)) return {}
    return handleBreakpoints(rootProps, baseProps[key], (value) => handleSortendProps(key, handleValue(value)));
  }))
}

export const space: ComposeFx = (rootProps) => {
  const { theme, ...props } = rootProps;
  const spaceProps = extractSpaceStyle(props)

  if (!theme) return {}

  const handleValue = (value: string | number) =>
    isSpaceVariants(theme, value) ? theme.spacing[value].toString() : value.toString()


  return mergeStyles(Object.keys(spaceProps).map((key) => {
    if (!isSpaceStylesPropsName(key)) return {}
    return handleBreakpoints(rootProps, spaceProps[key], (value) => handleSortendProps(key, handleValue(value)));
  }))
}

export const palette: ComposeFx = (rootProps) => {
  const { theme, ...props } = rootProps
  const colorsProps = extractColorStyle(props)

  if (!theme) return {}

  const colors = (flatten<Theme['palette'], FlattenColor>(theme.palette));

  const handleValue = (value: string) => {
    if (isColorVariants(colors, value)) {
      const color = colors[value]
      if (color) return color
    }
    return value
  }

  return mergeStyles(Object.keys(colorsProps).map((key) => {
    if (!isColorStylesPropsName(key)) return {}
    return handleBreakpoints(rootProps, colorsProps[key], (value) => handleSortendProps(key, handleValue(value)));
  }))
};

export const composeFx = (...args: ComposeFx[]) =>
  (rootProps: ComposeProps) => mergeStyles(args.map(fx => fx(rootProps)))

const compose = composeFx(base, space, palette)

export default compose;