import React from "react";
import compose from "styles/compose";
import styled from "styles/styled";
import { StylesProps } from "styles/stylesProps";
import { SxProps } from "types/CreateStyled";
import OverridableComponent, { WithPolymorphicProps } from "types/OverridableComponent";
import {
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
} from "react";

export type BoxProps = SxProps & StylesProps

/**
 * Box 컴포넌트
 */
const Box = forwardRef(
  <C extends ElementType>(
    { component, ...props }: WithPolymorphicProps<BoxProps, C>,
    ref: ComponentPropsWithRef<C>["ref"]
  ) => {
    const Component: ElementType = component || "div";
    return (
      <BoxBase
        as={Component}
        {...props}
        ref={ref}
      />
    );
  }
);

const BoxBase = styled.div(compose)

Box.displayName = "Box";

export default Box as OverridableComponent<BoxProps>;