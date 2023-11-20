import { ComponentProps, ComponentPropsWithRef, ElementType, ReactElement } from "react";

/** Polymorphic로 지정된 태그나 컴포넌트의 props를 가져옴 */
export type PolymorphicProps<T extends ElementType> = Omit<
ComponentProps<T>,
"color"
>  & {
/** Polymorphic로 특성을 상속받을 컴포넌트 */  
component?: T;
};

/** 
 * Polymorphic와 Generic type의 props를 합성해주는 type
 * Polymorphic로 지정된 태그나 컴포넌트의 props를 타입으로 가져와서 Generic type과 함성함
*/
export type WithPolymorphicProps<P , C extends ElementType> = P & PolymorphicProps<C>

/**
 * Polymorphic를 지정해 컴포넌트를 오버라이드할 수 있는 컴포넌트라는걸 나타내는 타입
 */
type OverridableComponent<P> = <C extends ElementType>(
  props: P & PolymorphicProps<C> & {
    ref?: ComponentPropsWithRef<C>["ref"];
  }
) => ReactElement | null;

export default OverridableComponent