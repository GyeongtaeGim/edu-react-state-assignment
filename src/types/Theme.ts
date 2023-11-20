import { CSSObject, CSSProperties } from "@emotion/serialize";
import { Globals } from "csstype";
import { ElementType } from "react";

/** 화면 사이즈를 미리 지정한 Breakpoints의 Variant */
export type BreakpointsVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 타입을 Breakpoints로 정의 가능한 타입으로 변경해주는 타입 */
export type WithBreakpoints<T> = Partial<Record<BreakpointsVariant, T>> | T | Array<NonNullable<T>>;

/** Props 타입을 Breakpoints로 설정 가능한 Props 타입으로 변경해주는 타입 */
export type WithBreakpointsProps<T> = {
  [P in keyof T]?: WithBreakpoints<T[P]>;
};

export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

/** Color의 tone을 타나내는 타입 */
export type ColorPartial = Partial<Color>

export interface PaletteColorOption {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

export type RadiusVariant = 0 | 1 | 2 | 3 | 4 | 5;
export type BoxShadowVariant = 0 | 1 | 2 | 3 | 4;

export interface TypographyOption {
  sx: {
    fontFamily?: CSSProperties['fontFamily'];
    fontSize?: CSSProperties['fontSize'];
    fontWeight?: CSSProperties['fontWeight'];
    letterSpacing?: CSSProperties['letterSpacing'];
    lineHeight?: CSSProperties['lineHeight'];
    textTransform?: CSSProperties['textTransform'];
  };
  component?: ElementType;
}

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'


export type SpaceVariant = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

/** `padding`, `margin`, `top`, `bottom`, `left`, `right`, `gap` 사이즈를 나타내는 타입 */
export type Space = SpaceVariant | Globals | (string & {});

export type PaletteColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

export type Colors = 'grey';

export type SystemColor = 'white' | 'black' | 'background';

export type PaletteColorVariant = `${PaletteColor}.${keyof PaletteColorOption}`

export type PaletteColorPartialVariant = `${PaletteColor}.${keyof ColorPartial}`

export type ColorsPartialVariant = `${Colors}.${keyof ColorPartial}`

export type SystemColorVariant = `system.${SystemColor}`

/** `theme`로 지정된 색상의 key union 타입 */
export type ColorVariant =  PaletteColorVariant | PaletteColorPartialVariant | ColorsPartialVariant | SystemColorVariant

export  type FlattenColor = Record<`${PaletteColor}.main` | SystemColorVariant, string> & Partial<Record<PaletteColorVariant | PaletteColorPartialVariant | ColorsPartialVariant, string>>

export type Palette = Record<PaletteColor, PaletteColorOption> & Record<Colors, ColorPartial> & {
  system: Record<SystemColor, string>;
}

/** 디자인 시스템이 이용할 `theme`의 타입 정의 */
export default interface Theme {
  palette: Palette;
  fontFamily: CSSObject['fontFamily'];
  typography: Record<TypographyVariant, TypographyOption>;
  component: {
    Button: {
      typography: TypographyOption;
    };
  };
  spacing: Record<SpaceVariant, string>;
  radius: Record<RadiusVariant, string>;
  effect: {
    boxShadow: Record<BoxShadowVariant, string>;
  };
  breakpoints: {
    values: Record<BreakpointsVariant, number>;
    keys: ['xs', 'sm', 'md', 'lg', 'xl'];
    unit: 'px' | 'em' | 'rem';
    step: number;
    up: (value: BreakpointsVariant) => string;
    down: (value: BreakpointsVariant) => string;
    not: (value: BreakpointsVariant) => string;
    only: (value: BreakpointsVariant) => string;
    between: (min: BreakpointsVariant, max: BreakpointsVariant) => string;
  };
}