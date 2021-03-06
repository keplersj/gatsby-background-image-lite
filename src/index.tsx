/** @jsx jsx */
import { PropsWithChildren, FunctionComponent } from "react";
import { graphql } from "gatsby";
import { css, jsx, SerializedStyles } from "@emotion/react";
import { backgroundImages } from "polished";
import { useInView } from "react-intersection-observer";
import { useWebPSupportCheck } from "react-use-webp-support-check";

export interface BackgroundImageObject {
  base64: string;
  src: string;
  srcWebp: string;
  media?: string;
}

function createBackgrounds(
  img: BackgroundImageObject | BackgroundImageObject[],
  supportsWebP = false
): SerializedStyles {
  if (Array.isArray(img)) {
    const backgroundsWithoutQuery = (img as Array<BackgroundImageObject>)
      .filter((asset) => !asset.media)
      .map((asset) =>
        asset.srcWebp && supportsWebP
          ? `url("${asset.srcWebp}")`
          : `url("${asset.src}")`
      );

    const backgroundsWithQuery = (img as Array<BackgroundImageObject>)
      .filter((asset) => Boolean(asset.media))
      .map((asset) => {
        const backgroundImage =
          asset.srcWebp && supportsWebP ? asset.srcWebp : asset.src;
        return css`
          @media ${asset.media} {
            background-image: url("${backgroundImage}");
          }
        `;
      });

    return css`
      ${backgroundImages(...backgroundsWithoutQuery)}
      ${backgroundsWithQuery}
    `;
  } else {
    return createBackgrounds([img], supportsWebP);
  }
}

function createBackupBackgrounds(
  img: BackgroundImageObject | BackgroundImageObject[]
): SerializedStyles {
  if (Array.isArray(img)) {
    const backgroundsWithoutQuery = (img as Array<BackgroundImageObject>)
      .filter((asset) => !asset.media)
      .map((asset) => `url("${asset.base64}")`);

    const backgroundsWithQuery = (img as Array<BackgroundImageObject>)
      .filter((asset) => Boolean(asset.media))
      .map(
        (asset) => css`
          @media ${asset.media} {
            background-image: url("${asset.base64}");
          }
        `
      );

    return css`
      ${backgroundImages(...backgroundsWithoutQuery)}
      ${backgroundsWithQuery}
    `;
  } else {
    return createBackupBackgrounds([img]);
  }
}

interface Props {
  image: BackgroundImageObject | BackgroundImageObject[];
  eager?: boolean;
  tag?: keyof JSX.IntrinsicElements;
}

const defaultProps: Partial<Props> = {
  tag: "div",
  eager: false,
};

export const BackgroundImage: FunctionComponent<PropsWithChildren<Props>> = (
  props: PropsWithChildren<Props>
) => {
  // Let's pretend whatever element this is supponsed to be is a div, so the TypeScript stops freaking out about complexity.
  const ContainerElement = props.tag as "div";
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const supportsWebP = useWebPSupportCheck();

  const noscriptStyle = css`
    noscript {
      z-index: -100;

      opacity: 1;

      ${createBackgrounds(props.image)}
    }
  `;

  return (
    <ContainerElement
      ref={ref}
      data-testid="BackgroundImageContainerElement"
      css={css`
        position: relative;

        ::before,
        ::after {
          position: absolute;
          top: 0;
          left: 0;

          display: block;
          width: 100%;
          height: 100%;

          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;

          transition: opacity 0.5s ease 0.25s;

          content: "";

          @media screen and (prefers-reduced-motion: reduce) {
            transition: none;
          }
        }

        ::after {
          z-index: -100;

          opacity: ${inView || props.eager ? "1" : "0"};

          ${(inView || props.eager) &&
          createBackgrounds(props.image, supportsWebP)}
        }

        ::before {
          z-index: -101;

          opacity: 1;

          ${createBackupBackgrounds(props.image)}
        }
      `}
    >
      <noscript className={noscriptStyle.name}>
        <style
          dangerouslySetInnerHTML={{
            __html: noscriptStyle.styles,
          }}
        />
      </noscript>
      {props.children}
    </ContainerElement>
  );
};

BackgroundImage.defaultProps = defaultProps;

export const GatsbyBackgroundImageSharpFixed = graphql`
  fragment GatsbyBackgroundImageSharpFixed on ImageSharpFixed {
    base64
    src
    srcWebp
  }
`;

export const GatsbyImageSharpFluid = graphql`
  fragment GatsbyBackgroundImageSharpFluid on ImageSharpFluid {
    base64
    src
    srcWebp
  }
`;
