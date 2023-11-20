import Theme, { BreakpointsVariant, ColorVariant, Space, SpaceVariant, WithBreakpointsProps } from "types/Theme"
import { CSSProperties } from "@emotion/serialize"
import { DataType } from "csstype"
import { ReactNode } from "react"

const baseStylesProps = [
  'display',
  'flex',
  'flexDirection',
  'flexWrap',
  'alignItems',
  'justifyContent',
  'background',
  'position',
  'zIndex',
  'border',
  'borderTop',
  'borderBottom',
  'borderRight',
  'borderLeft',
  'borderRadius',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'whiteSpace',
  'wordBreak',
  'wordSpacing',
  'wordWrap',
  'overflow',
  'overflowY',
  'overflowX',
  'textOverflow',
  'cursor'
] as const

export const spaceStylesProps = [
  'top',
  'bottom',
  'left',
  'right',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingRight',
  'paddingLeft',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
  'margin',
  'marginTop',
  'marginBottom',
  'marginRight',
  'marginLeft',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'mt',
  'mb',
  'mr',
  'ml',
  'mx',
  'my',
  'pt',
  'pb',
  'pr',
  'pl',
  'px',
  'py',
  'spacing',
  'spacingX',
  'spacingY',
] as const

const colorStylesProps = [
  'color',
  'backgroundColor',
  'fill',
  'outlineColor',
  'borderColor',
  'borderTopColor',
  'borderBottomColor',
  'borderRightColor',
  'borderLeftColor',
  'bgColor',
] as const

export const sortendPropsMap = {
  'mt': ['marginTop'],
  'mb': ['marginBottom'],
  'mr': ['marginRight'],
  'ml': ['marginLeft'],
  'mx': ['marginLeft', 'marginRight'],
  'my': ['marginTop', 'marginBottom'],
  'pt': ['paddingTop'],
  'pb': ['paddingBottom'],
  'pr': ['paddingRight'],
  'pl': ['paddingLeft'],
  'px': ['paddingLeft', 'paddingRight'],
  'py': ['paddingTop', 'paddingBottom'],
  'spacing': ['gap'],
  'spacingX': ['rowGap'],
  'spacingY': ['columnGap'],
  'bgColor': ['backgroundColor'],
} as const

export type SortendPropsName = keyof typeof sortendPropsMap

const stylesProps = [...baseStylesProps, ...spaceStylesProps, ...colorStylesProps] as const
export default stylesProps

type WithoutObject<T> = {
  [P in keyof T]: Exclude<T[P], object>;
};

export type BaseStylesPropsName = typeof baseStylesProps[number]

export type BaseStylesProps = WithBreakpointsProps<WithoutObject<Pick<CSSProperties, BaseStylesPropsName>>>

export type SpaceStylesPropsName = typeof spaceStylesProps[number]

export type SpaceStylesProps = Partial<WithBreakpointsProps<Record<SpaceStylesPropsName, Space>>>

export type ColorStylesPropsName = typeof colorStylesProps[number]

export type ColorStylesProps = Partial<WithBreakpointsProps<Record<ColorStylesPropsName, ColorVariant | DataType.Color>>>

export type StylesProps = BaseStylesProps & SpaceStylesProps & ColorStylesProps

export type StylesPropsName = typeof stylesProps[number]

export const extractBaseStyle = <T extends { [key: string]: object | ReactNode }>(props: T): BaseStylesProps => {
  return Object.fromEntries(Object.keys(props).filter((v) => baseStylesProps.includes(v as BaseStylesPropsName)).map(key => ([key, props[key]]))) as BaseStylesProps;
}

export const extractSpaceStyle = <T extends { [key: string]: object | ReactNode }>(props: T): SpaceStylesProps => {
  return Object.fromEntries(Object.keys(props).filter((v) => spaceStylesProps.includes(v as SpaceStylesPropsName)).map(key => ([key, props[key]]))) as SpaceStylesProps;
}

export const extractColorStyle = <T extends { [key: string]: object | ReactNode }>(props: T): ColorStylesProps => {
  return Object.fromEntries(Object.keys(props).filter((v) => colorStylesProps.includes(v as ColorStylesPropsName)).map(key => ([key, props[key]]))) as ColorStylesProps;
}

export const isSortendProps = (key: string): key is SortendPropsName => {
  return Object.hasOwn(sortendPropsMap, key)
}

export const isBreakpointsVariant = (theme: Theme, value: string): value is BreakpointsVariant => {
  return Object.hasOwn(theme.breakpoints.values, value)
}

export const isBaseStylesPropsName = (name: string): name is BaseStylesPropsName => {
  const props: string[] = [...baseStylesProps]
  return props.includes(name)
}

export const isSpaceVariants = (theme: Theme, value: string | number): value is SpaceVariant => {
  return Object.hasOwn(theme.spacing, value)
}

export const isSpaceStylesPropsName = (name: string): name is SpaceStylesPropsName => {
  const props: string[] = [...spaceStylesProps]
  return props.includes(name)
}

export const isColorVariants = (colors: Partial<Record<ColorVariant, string>>, color: string): color is ColorVariant => {
  return Object.hasOwn(colors, color);
}

export const isColorStylesPropsName = (name: string): name is ColorStylesPropsName => {
  const props: string[] = [...colorStylesProps]
  return props.includes(name)
}