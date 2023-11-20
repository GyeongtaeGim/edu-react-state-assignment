import Theme, { BreakpointsVariant } from "@/types/Theme";
import { PropsOf } from "@emotion/react";
import { CSSObject } from "@emotion/serialize";
import { CreateStyledComponent, FilteringStyledOptions, StyledOptions } from "@emotion/styled";

export type MergeTheme<BaseTheme extends object, AddedTheme extends object> = BaseTheme & AddedTheme;

export type SxType = CSSObject & Partial<Record<BreakpointsVariant, CSSObject>>;

export type Sx = SxType | ((theme: Theme) => SxType);

export interface SxProps {
  /**
   * 컴포넌트에 스타일을 적용할 수 있는 `CSSObject` `props`
   * `BreakpointsVariant`가 적용되어있어 각 화면 사이즈별로 스타일을 줄 수 있음
   */
  sx?: Sx;
}

export type StyledTags<AddedTheme> = {
  [Tag in keyof JSX.IntrinsicElements]: CreateStyledComponent<
    {
      theme?: AddedTheme;
      sx?: SxType | ((theme: AddedTheme) => CSSObject);
      as?: React.ElementType;
    },
    JSX.IntrinsicElements[Tag]
  >;
};


interface CreateStyled<AddedTheme> {
  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> & string = keyof React.ComponentProps<C> & string,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>,
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & {
      theme?: AddedTheme;
      sx?: SxType | ((theme: AddedTheme) => CSSObject);
      as?: React.ElementType;
    }
  >;

  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<React.ComponentProps<C>>,
  ): CreateStyledComponent<
    PropsOf<C> & {
      theme?: AddedTheme;
      sx?: SxType | ((theme: AddedTheme) => CSSObject);
      as?: React.ElementType;
    }
  >;

  <
    Tag extends keyof JSX.IntrinsicElements,
    ForwardedProps extends keyof JSX.IntrinsicElements[Tag] & string = keyof JSX.IntrinsicElements[Tag] & string,
  >(
    tag: Tag,
    options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps>,
  ): CreateStyledComponent<
    {
      theme?: AddedTheme;
      sx?: SxType | ((theme: AddedTheme) => CSSObject);
      as?: React.ElementType;
    },
    Pick<JSX.IntrinsicElements[Tag], ForwardedProps>
  >;

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions<JSX.IntrinsicElements[Tag]>,
  ): CreateStyledComponent<
    {
      theme?: AddedTheme;
      sx?: SxType | ((theme: AddedTheme) => CSSObject);
      as?: React.ElementType;
    },
    JSX.IntrinsicElements[Tag]
  >;
}

export default CreateStyled