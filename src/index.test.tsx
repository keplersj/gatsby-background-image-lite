import * as React from "react";
import { render } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { matchers } from "@emotion/jest";
import { BackgroundImage, BackgroundImageObject } from ".";

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

const sampleBase64 =
  "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYBAgX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAB1ZUrU0CyL//EABoQAAICAwAAAAAAAAAAAAAAAAACARIREyH/2gAIAQEAAQUCiFMIUg6XY2Mf/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oACAECAQE/AW1//8QAGBAAAwEBAAAAAAAAAAAAAAAAAAIyEDH/2gAIAQEABj8C3pbFsf/EAB4QAAEDBAMAAAAAAAAAAAAAAAABEUEhUWFxkdHx/9oACAEBAAE/IcnggdtoLfKJjfce4f/aAAwDAQACAAMAAAAQGw//xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAIAQMBAT8QAsL/xAAVEQEBAAAAAAAAAAAAAAAAAAABEP/aAAgBAgEBPxBWH//EABwQAQACAgMBAAAAAAAAAAAAAAEAESFRcbHRwf/aAAgBAQABPxBpi3Fuos5FpCIbpBzBcLAlYNX9gZ9/s//Z";

beforeEach(() => {
  mockAllIsIntersecting(false);
});

describe("Background Image", () => {
  describe("when given an Image object", () => {
    const sampleImage: BackgroundImageObject = {
      base64: sampleBase64,
      src: "/static/banner_example/1/banner.jpg",
      srcWebp: "/static/banner_example/2/banner.webp"
    };

    it("renders correctly", () => {
      const { asFragment } = render(<BackgroundImage image={sampleImage} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("updates after entering the viewport correctly", () => {
      const { asFragment, getByTestId } = render(
        <BackgroundImage image={sampleImage} />
      );

      expect(getByTestId("BackgroundImageContainerElement")).toHaveStyleRule(
        "opacity",
        "0",
        {
          target: "::after"
        }
      );

      mockAllIsIntersecting(true);

      const afterIntersect = asFragment();
      expect(getByTestId("BackgroundImageContainerElement")).toHaveStyleRule(
        "opacity",
        "1",
        {
          target: "::after"
        }
      );
      expect(afterIntersect).toMatchSnapshot();
    });
  });

  describe("when given an array of Image objects", () => {
    const sampleImages: BackgroundImageObject[] = [
      {
        base64: sampleBase64,
        src: "/static/banner_example/1/banner.jpg",
        srcWebp: "/static/banner_example/2/banner.webp"
      },
      {
        base64: sampleBase64,
        src: "/static/banner_example/1/banner.jpg",
        srcWebp: "/static/banner_example/2/banner.webp"
      }
    ];

    it("renders correctly", () => {
      const { asFragment } = render(<BackgroundImage image={sampleImages} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("updates after entering the viewport correctly", () => {
      const { asFragment, getByTestId } = render(
        <BackgroundImage image={sampleImages} />
      );

      expect(getByTestId("BackgroundImageContainerElement")).toHaveStyleRule(
        "opacity",
        "0",
        {
          target: "::after"
        }
      );

      mockAllIsIntersecting(true);

      const afterIntersect = asFragment();
      expect(getByTestId("BackgroundImageContainerElement")).toHaveStyleRule(
        "opacity",
        "1",
        {
          target: "::after"
        }
      );
      expect(afterIntersect).toMatchSnapshot();
    });
  });

  describe("when given an array of Image objects (media queries included)", () => {
    const sampleImages: BackgroundImageObject[] = [
      {
        base64: sampleBase64,
        src: "/static/banner_example/1/banner.jpg",
        srcWebp: "/static/banner_example/2/banner.webp"
      },
      {
        base64: sampleBase64,
        src: "/static/banner_example/1/banner.jpg",
        srcWebp: "/static/banner_example/2/banner.webp"
      },
      {
        base64: sampleBase64,
        src: "/static/banner_example/1/banner.jpg",
        srcWebp: "/static/banner_example/2/banner.webp",
        media: "screen and (prefers-color-scheme: dark)"
      }
    ];

    it("renders correctly", () => {
      const { asFragment } = render(<BackgroundImage image={sampleImages} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("updates after entering the viewport correctly", () => {
      const { asFragment, getByTestId } = render(
        <BackgroundImage image={sampleImages} />
      );

      expect(getByTestId("BackgroundImageContainerElement")).toHaveStyleRule(
        "opacity",
        "0",
        {
          target: "::after"
        }
      );

      mockAllIsIntersecting(true);

      const afterIntersect = asFragment();
      expect(getByTestId("BackgroundImageContainerElement")).toHaveStyleRule(
        "opacity",
        "1",
        {
          target: "::after"
        }
      );
      expect(afterIntersect).toMatchSnapshot();
    });
  });

  describe("when given an Image object with the eager prop", () => {
    it("renders correctly", () => {
      const sampleImage: BackgroundImageObject = {
        base64: sampleBase64,
        src: "/static/banner_example/1/banner.jpg",
        srcWebp: "/static/banner_example/2/banner.webp"
      };

      const { asFragment } = render(
        <BackgroundImage eager image={sampleImage} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("when given an Image object with a media query", () => {
    const sampleImage: BackgroundImageObject = {
      base64: sampleBase64,
      src: "/static/banner_example/1/banner.jpg",
      srcWebp: "/static/banner_example/2/banner.webp",
      media: "screen and (prefers-color-scheme: dark)"
    };

    it("renders correctly", () => {
      const { asFragment } = render(<BackgroundImage image={sampleImage} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("updates after entering the viewport correctly", () => {
      const { asFragment, getByTestId } = render(
        <BackgroundImage image={sampleImage} />
      );

      expect(getByTestId("BackgroundImageContainerElement")).toHaveStyleRule(
        "opacity",
        "0",
        {
          target: "::after"
        }
      );

      mockAllIsIntersecting(true);

      const afterIntersect = asFragment();
      expect(getByTestId("BackgroundImageContainerElement")).toHaveStyleRule(
        "opacity",
        "1",
        {
          target: "::after"
        }
      );
      expect(afterIntersect).toMatchSnapshot();
    });
  });
});
