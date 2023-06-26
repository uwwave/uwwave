import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { BackgroundColor, Color } from "src/styles/color";
import { useViewport } from "src/lib/hooks/useViewport";

export const ExtensionAnimation = () => {
  const { isMobile } = useViewport();
  const comp = useRef<SVGSVGElement>(null);
  const backgroundRef = useRef<SVGRectElement>(null);
  const highlightedTabRef = useRef<SVGPathElement>(null);
  const searchTextRef = useRef<SVGTextElement>(null);
  const searchTextWaveRef = useRef<SVGGElement>(null);
  const searchBarBackRef = useRef<SVGRectElement>(null);
  const extensionPopoutRef = useRef<SVGGElement>(null);
  const circularProgressRef = useRef<SVGCircleElement>(null);
  const greenCircleExpandRef = useRef<SVGCircleElement>(null);
  const checkmarkRef = useRef<SVGPolygonElement>(null);
  const windowHeaderRef = useRef<SVGPathElement>(null);
  const poopRef = useRef<SVGGElement>(null);
  const paperBackgroundRef = useRef<SVGRectElement>(null);
  const paperTopRef = useRef<SVGRectElement>(null);
  const paperBottomRef = useRef<SVGRectElement>(null);
  const teslaTRef = useRef<SVGGElement>(null);
  const companyLogoRef = useRef<SVGRectElement>(null);
  const statsBackgroundRef = useRef<SVGRectElement>(null);
  const whitePillar1Ref = useRef<SVGRectElement>(null);
  const whitePillar2Ref = useRef<SVGRectElement>(null);
  const whitePillar3Ref = useRef<SVGRectElement>(null);
  const innerPillar1Ref = useRef<SVGRectElement>(null);
  const innerPillar2Ref = useRef<SVGRectElement>(null);
  const innerPillar3Ref = useRef<SVGRectElement>(null);
  const stat1BoxRef = useRef<SVGRectElement>(null);
  const stat2BoxRef = useRef<SVGRectElement>(null);
  const stat3BoxRef = useRef<SVGRectElement>(null);
  const stat1IconRef = useRef<SVGRectElement>(null);
  const stat2IconRef = useRef<SVGRectElement>(null);
  const stat3IconRef = useRef<SVGRectElement>(null);
  const techIcon1Ref = useRef<SVGGElement>(null);
  const techIcon2Ref = useRef<SVGGElement>(null);
  const techIcon3Ref = useRef<SVGPathElement>(null);
  const techIcon4Ref = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const TL = gsap.timeline({ repeat: -1 });

      //IN TRANSITION
      const inTween = gsap.from(comp.current, {
        opacity: 0,
        translateY: -40,
        ease: "power3.out",
      });
      const outTween = gsap.to(comp.current, {
        opacity: 0,
        translateY: 40,
        ease: "power3.out",
      });
      //EXTENSION OPEN
      const extensionOpenTL = gsap.timeline();
      const extensionOpenExpand = gsap.fromTo(
        extensionPopoutRef.current,
        { scale: 0, transformOrigin: "100% 0" },
        { scale: 1, duration: 0.4, ease: "back" }
      );
      const progressTo100 = gsap.fromTo(
        circularProgressRef.current,
        {
          strokeDashoffset: 400,
          rotate: -90,
          transformOrigin: "center",
          strokeLinecap: "round",
        },
        { strokeDashoffset: 50, duration: 2.6, ease: "power3.out" }
      );
      const expandGreen = gsap.fromTo(
        greenCircleExpandRef.current,
        { r: 0 },
        { r: 130, duration: 0.6, ease: "power2.out" }
      );
      const drawCheckmark = gsap.fromTo(
        checkmarkRef.current,
        { strokeDashoffset: 400 },
        { strokeDashoffset: 320, duration: 0.6 }
      );
      extensionOpenTL.add(extensionOpenExpand);
      extensionOpenTL.add(progressTo100, "-=0.4");
      extensionOpenTL.add(expandGreen, ">-1.1");
      extensionOpenTL.add(drawCheckmark, ">-0.5");

      //CHANGE THEME
      const changeThemeTL = gsap.timeline();
      const changeWindowHeader = gsap.to(windowHeaderRef.current, {
        fill: BackgroundColor.darker,
        duration: 0.8,
      });
      const changeSearchbarBack = gsap.to(searchBarBackRef.current, {
        fill: Color.primaryButton,
        duration: 0.8,
      });
      const hidePoop = gsap.to(poopRef.current, { opacity: 0, duration: 0.3 });
      const changeBackground = gsap.to(backgroundRef.current, {
        fill: BackgroundColor.darker,
        duration: 0.8,
      });
      const slideTab = gsap.from(highlightedTabRef.current, {
        translateX: -102,
        duration: 0.8,
        ease: "power3.out",
      });
      const hideWorksURL = gsap.to(searchTextRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      const showWaveURL = gsap.from(searchTextWaveRef.current, {
        scale: 0,
        duration: 0.4,
        ease: "back",
        transformOrigin: "center",
        x: 32,
      });
      changeThemeTL.add(changeWindowHeader);
      changeThemeTL.add(changeSearchbarBack, "<");
      changeThemeTL.add(hidePoop, "<");
      changeThemeTL.add(changeBackground, "<");
      changeThemeTL.add(slideTab, "<");
      changeThemeTL.add(hideWorksURL, "<");
      changeThemeTL.add(showWaveURL, "<+=0.2");

      //HIDE EXTENSION
      const extensionCloseTL = gsap.timeline();
      const closeCheckmark = gsap.fromTo(
        checkmarkRef.current,
        { transformOrigin: "center" },
        { scale: 0, duration: 0.4, ease: "power3.out" }
      );
      const extensionClose = gsap.to(extensionPopoutRef.current, {
        scale: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      extensionCloseTL.add(closeCheckmark);
      extensionCloseTL.add(extensionClose, ">-=0.2");

      //DISPLAY PAGE PAPER
      const pagePaperTL = gsap.timeline();
      const showBackground = gsap.from(paperBackgroundRef.current, {
        height: 0,
        ease: "power3.out",
        duration: 0.6,
      });
      const showPaperTop = gsap.from(paperTopRef.current, {
        translateY: 260,
        ease: "power3.out",
        duration: 0.6,
      });
      const showPaperBottom = gsap.from(paperBottomRef.current, {
        translateY: 220,
        ease: "power3.out",
        duration: 0.6,
      });
      pagePaperTL.add(showBackground);
      pagePaperTL.add(showPaperTop, ">-=0.4");
      pagePaperTL.add(showPaperBottom, ">-=0.48");

      //DISPLAY COMPANY LOGO
      const companyLogoTL = gsap.timeline();
      const showCompanyBGColor = gsap.from(companyLogoRef.current, {
        scale: 0,
        ease: "back",
        duration: 0.6,
        transformOrigin: "center",
      });
      const showCompanyLogo = gsap.from(teslaTRef.current, {
        scale: 0,
        ease: "back",
        duration: 0.42,
        transformOrigin: "center",
      });
      companyLogoTL.add(showCompanyBGColor);
      companyLogoTL.add(showCompanyLogo, ">-=0.4");

      //DISPLAY STATS
      const statsTL = gsap.timeline();
      const showStatsBG = gsap.from(statsBackgroundRef.current, {
        transformOrigin: "center",
        ease: "back",
        scale: 0,
      });
      const showWhitePillar1 = gsap.from(whitePillar1Ref.current, {
        translateY: 101.67,
        height: 0,
        ease: "power3.out",
      });
      const showWhitePillar2 = gsap.from(whitePillar2Ref.current, {
        translateY: 101.67,
        height: 0,
        ease: "power3.out",
      });
      const showWhitePillar3 = gsap.from(whitePillar3Ref.current, {
        translateY: 101.67,
        height: 0,
        ease: "power3.out",
      });
      const showStatBox1 = gsap.from(stat1BoxRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
      });
      const showStatBox2 = gsap.from(stat2BoxRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
      });
      const showStatBox3 = gsap.from(stat3BoxRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
      });
      const showInnerPillar1 = gsap.from(innerPillar1Ref.current, {
        translateY: 90.02,
        height: 0,
        ease: "power3.out",
        duration: 0.6,
      });
      const showInnerPillar2 = gsap.from(innerPillar2Ref.current, {
        translateY: 75.09,
        height: 0,
        ease: "power3.out",
        duration: 0.9,
      });
      const showInnerPillar3 = gsap.from(innerPillar3Ref.current, {
        translateY: 59.69,
        height: 0,
        ease: "power3.out",
        duration: 1.2,
      });
      const showStatIcon1 = gsap.from(stat1IconRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.6,
      });
      const showStatIcon2 = gsap.from(stat2IconRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.8,
      });
      const showStatIcon3 = gsap.from(stat3IconRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.9,
      });
      statsTL.add(showStatsBG);
      statsTL.add(showWhitePillar1, "<+=0.4");
      statsTL.add(showWhitePillar2, "<");
      statsTL.add(showWhitePillar3, "<");
      statsTL.add(showStatBox1, "<");
      statsTL.add(showStatBox2, "<");
      statsTL.add(showStatBox3, "<");
      statsTL.add(showInnerPillar1, ">-=0.3");
      statsTL.add(showStatIcon1, "<");
      statsTL.add(showInnerPillar2, ">-=0.5");
      statsTL.add(showStatIcon2, "<");
      statsTL.add(showInnerPillar3, ">-=0.7");
      statsTL.add(showStatIcon3, "<");

      //DISPLAY TECH
      const techTL = gsap.timeline();
      const showTech1 = gsap.from(techIcon1Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
      });
      const showTech2 = gsap.from(techIcon2Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.6,
      });
      const showTech3 = gsap.from(techIcon3Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.8,
      });
      const showTech4 = gsap.from(techIcon4Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.8,
      });
      techTL.add(showTech1);
      techTL.add(showTech2, ">-=0.3");
      techTL.add(showTech3, ">-=0.5");
      techTL.add(showTech4, ">-=0.6");

      //Construct timeline
      TL.add(inTween);
      TL.add(extensionOpenTL, ">+=0.5");
      TL.add(changeThemeTL, ">-=0.8");
      TL.add(pagePaperTL, ">-=0.5");
      TL.add(extensionCloseTL, "<+=0.2");
      TL.add(companyLogoTL, "<");
      TL.add(statsTL, "<+=0.2");
      TL.add(techTL, "<+=0.4");
      TL.add(outTween, "<+=3");
      TL.play();
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      width={isMobile ? "100%" : "88%"}
      viewBox="0 0 582.29 372.13"
      ref={comp}
    >
      <rect
        width="581.97"
        height="372.13"
        rx="8"
        ry="8"
        fill="#303030"
        ref={backgroundRef}
      />
      <rect
        ref={paperBackgroundRef}
        y="83.61"
        width="581.95"
        height="262.28"
        fill="#eaeaea"
      />
      <path
        ref={windowHeaderRef}
        d="M8,0H574a8,8,0,0,1,8,8V41.8a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V8A8,8,0,0,1,8,0Z"
        fill="#7d7d7d"
      />
      <path
        ref={highlightedTabRef}
        d="M205.31,10.8h85.52a8,8,0,0,1,8,8v23a0,0,0,0,1,0,0H197.31a0,0,0,0,1,0,0v-23A8,8,0,0,1,205.31,10.8Z"
        fill="#008ae6"
      />
      <path
        d="M103.6,10.8h85.52a8,8,0,0,1,8,8v23a0,0,0,0,1,0,0H95.6a0,0,0,0,1,0,0v-23A8,8,0,0,1,103.6,10.8Z"
        fill="#eaeaea"
      />
      <rect
        ref={searchBarBackRef}
        y="41"
        width="581.97"
        height="43"
        fill="#eaeaea"
      />
      <rect
        x="8"
        y="47.58"
        width="494.7"
        height="29.35"
        rx="14.68"
        ry="14.68"
        fill="#fff"
      />
      <g>
        <rect
          x="536.34"
          y="47.29"
          width="29.49"
          height="29.49"
          rx="4"
          ry="4"
          fill="#008ae6"
        />
        <g>
          <path
            d="M591.07,93.09h0a1.58,1.58,0,0,1,1.58,1.58v3.94a1.58,1.58,0,0,1-1.58,1.58h0a1.58,1.58,0,0,1-1.58-1.58V94.67A1.58,1.58,0,0,1,591.07,93.09Z"
            transform="translate(-29.77 -30.87)"
            fill="#fff"
          />
          <path
            d="M570.65,95.05h0a1.58,1.58,0,0,1,1.58,1.58v2a1.58,1.58,0,0,1-1.58,1.58h0a1.58,1.58,0,0,1-1.58-1.58v-2A1.58,1.58,0,0,1,570.65,95.05Z"
            transform="translate(-29.77 -30.87)"
            fill="#fff"
          />
          <path
            d="M586,85.62a1.66,1.66,0,0,0-1.59,1.72l0,8.29a1,1,0,1,1-2,0V92.86a1.58,1.58,0,1,0-3.15-.17v2.94a1,1,0,0,1-1,1.07h0a1,1,0,0,1-1-1.07V89.46a1.59,1.59,0,1,0-3.17,0v9.27a1.39,1.39,0,0,0,1.33,1.45h10.76a1.39,1.39,0,0,0,1.33-1.45V87.34A1.65,1.65,0,0,0,586,85.62Z"
            transform="translate(-29.77 -30.87)"
            fill="#fff"
          />
        </g>
      </g>
      <text
        ref={searchTextRef}
        transform="translate(32 67.85)"
        font-size="14.6"
        fill="#8e8e8e"
        font-family="Lato"
      >
        www.waterlooworks.uwaterloo.ca
      </text>
      <g ref={searchTextWaveRef} transform="translate(32 60)">
        <path
          d="M692.11,91.23V96a1.6,1.6,0,0,0,.32,1.06,1.18,1.18,0,0,0,1,.38,1.9,1.9,0,0,0,.88-0.21,3.06,3.06,0,0,0,.77-0.57V91.23h1.8v7.49h-1.1a0.44,0.44,0,0,1-.46-0.33l-0.12-.6a5.2,5.2,0,0,1-.48.43,2.88,2.88,0,0,1-1.14.54,3,3,0,0,1-.7.08,2.66,2.66,0,0,1-1.08-.21A2.17,2.17,0,0,1,691,98a2.57,2.57,0,0,1-.49-0.9,3.82,3.82,0,0,1-.16-1.15V91.23h1.8Z"
          transform="translate(-690.31 -91.09)"
        />
        <path
          d="M697.85,91.23h1.43a0.59,0.59,0,0,1,.34.09,0.41,0.41,0,0,1,.18.24l1.07,4c0.06,0.22.11,0.43,0.14,0.64l0.11,0.63c0.05-.21.11-0.42,0.17-0.63l0.19-.64,1.24-4a0.45,0.45,0,0,1,.17-0.24,0.51,0.51,0,0,1,.31-0.09H704a0.55,0.55,0,0,1,.33.09,0.46,0.46,0,0,1,.17.24l1.23,4.09c0.06,0.21.12,0.41,0.17,0.61l0.15,0.59c0-.21.07-0.42,0.11-0.63s0.09-.43.16-0.65l1.11-4a0.41,0.41,0,0,1,.17-0.24,0.56,0.56,0,0,1,.32-0.09h1.37l-2.37,7.49h-1.45a0.37,0.37,0,0,1-.34-0.32l-1.35-4.33c0-.14-0.08-0.28-0.12-0.43s-0.07-.29-0.09-0.43c0,0.15-.06.29-0.09,0.43s-0.07.29-.12,0.43L702,98.4a0.4,0.4,0,0,1-.39.32h-1.38Z"
          transform="translate(-690.31 -91.09)"
        />
        <path
          d="M709.4,91.23h1.43a0.6,0.6,0,0,1,.34.09,0.41,0.41,0,0,1,.17.24l1.07,4q0.09,0.33.14,0.64c0,0.21.07,0.42,0.11,0.63q0.08-.31.17-0.63l0.19-.64,1.24-4a0.45,0.45,0,0,1,.18-0.24,0.51,0.51,0,0,1,.31-0.09h0.8a0.55,0.55,0,0,1,.33.09,0.45,0.45,0,0,1,.17.24l1.23,4.09c0.06,0.21.12,0.41,0.17,0.61l0.15,0.59q0.05-.31.11-0.63c0-.21.09-0.43,0.16-0.65l1.11-4a0.41,0.41,0,0,1,.18-0.24,0.56,0.56,0,0,1,.32-0.09h1.37l-2.37,7.49H717a0.37,0.37,0,0,1-.34-0.32l-1.35-4.33c0-.14-0.08-0.28-0.12-0.43s-0.07-.29-0.09-0.43c0,0.15-.06.29-0.1,0.43s-0.07.29-.12,0.43l-1.37,4.31a0.4,0.4,0,0,1-.39.32h-1.38Z"
          transform="translate(-690.31 -91.09)"
        />
        <path
          d="M727.74,98.72h-0.81a0.87,0.87,0,0,1-.4-0.08,0.49,0.49,0,0,1-.22-0.31l-0.16-.53a6.24,6.24,0,0,1-.56.45,3.36,3.36,0,0,1-.57.32,2.9,2.9,0,0,1-.62.2,3.76,3.76,0,0,1-.73.07,2.87,2.87,0,0,1-.88-0.13,1.88,1.88,0,0,1-.69-0.38,1.74,1.74,0,0,1-.45-0.64,2.26,2.26,0,0,1-.16-0.89,1.75,1.75,0,0,1,.22-0.84,2.1,2.1,0,0,1,.74-0.75,4.73,4.73,0,0,1,1.38-.55,8.82,8.82,0,0,1,2.14-.22V94a1.68,1.68,0,0,0-.32-1.12,1.16,1.16,0,0,0-.92-0.36,2.23,2.23,0,0,0-.73.1,2.79,2.79,0,0,0-.51.23l-0.4.23a0.81,0.81,0,0,1-.4.1,0.52,0.52,0,0,1-.31-0.09,0.74,0.74,0,0,1-.21-0.23l-0.33-.58A4.45,4.45,0,0,1,725,91.09a3,3,0,0,1,1.17.22,2.49,2.49,0,0,1,.87.6,2.56,2.56,0,0,1,.54.92,3.52,3.52,0,0,1,.19,1.17v4.73Zm-3.5-1.12a2.42,2.42,0,0,0,.51-0.05,1.92,1.92,0,0,0,.44-0.15,2.32,2.32,0,0,0,.4-0.25A3.65,3.65,0,0,0,726,96.8V95.54a7.31,7.31,0,0,0-1.32.1,3.51,3.51,0,0,0-.85.25,1.09,1.09,0,0,0-.46.36,0.8,0.8,0,0,0-.13.45,0.79,0.79,0,0,0,.28.68A1.21,1.21,0,0,0,724.23,97.59Z"
          transform="translate(-690.31 -91.09)"
        />
        <path
          d="M733,98.72h-1.63l-3-7.49h1.5a0.56,0.56,0,0,1,.33.09,0.49,0.49,0,0,1,.19.24l1.45,4q0.12,0.35.21,0.69t0.15,0.67q0.06-.34.15-0.67a6.45,6.45,0,0,1,.21-0.69l1.48-4a0.49,0.49,0,0,1,.18-0.24,0.52,0.52,0,0,1,.31-0.09H736Z"
          transform="translate(-690.31 -91.09)"
        />
        <path
          d="M739.89,91.11a3.64,3.64,0,0,1,1.3.23,2.85,2.85,0,0,1,1,.66,3,3,0,0,1,.67,1.07,4,4,0,0,1,.24,1.44,2.69,2.69,0,0,1,0,.34,0.56,0.56,0,0,1-.07.21,0.27,0.27,0,0,1-.13.11,0.56,0.56,0,0,1-.21,0h-4.63a2.58,2.58,0,0,0,.62,1.69,1.93,1.93,0,0,0,1.43.54,2.47,2.47,0,0,0,.76-0.1,3.48,3.48,0,0,0,.55-0.23l0.42-.23a0.7,0.7,0,0,1,.35-0.1,0.4,0.4,0,0,1,.19,0,0.42,0.42,0,0,1,.14.12l0.53,0.66a3,3,0,0,1-.67.59,3.74,3.74,0,0,1-.78.38,4.22,4.22,0,0,1-.83.2,6,6,0,0,1-.81.06,4,4,0,0,1-1.45-.26,3.24,3.24,0,0,1-1.17-.77,3.58,3.58,0,0,1-.78-1.26,4.85,4.85,0,0,1-.29-1.73,4.16,4.16,0,0,1,.25-1.44,3.48,3.48,0,0,1,.71-1.18,3.36,3.36,0,0,1,1.13-.79A3.73,3.73,0,0,1,739.89,91.11Zm0,1.29a1.67,1.67,0,0,0-1.23.45,2.2,2.2,0,0,0-.57,1.26h3.39a2.27,2.27,0,0,0-.09-0.66,1.53,1.53,0,0,0-.29-0.54,1.38,1.38,0,0,0-.5-0.37A1.68,1.68,0,0,0,739.93,92.4Z"
          transform="translate(-690.31 -91.09)"
        />
        <path
          d="M744.17,97.73a1.13,1.13,0,0,1,.08-0.43,1,1,0,0,1,.23-0.35,1.14,1.14,0,0,1,.35-0.23,1.09,1.09,0,0,1,.44-0.09,1.08,1.08,0,0,1,.43.09,1.1,1.1,0,0,1,.67,1,1.09,1.09,0,0,1-.09.43,1.11,1.11,0,0,1-.23.35,1,1,0,0,1-.35.23,1.12,1.12,0,0,1-.43.08,1.14,1.14,0,0,1-.44-0.08,1.08,1.08,0,0,1-.35-0.23,1,1,0,0,1-.23-0.35A1.12,1.12,0,0,1,744.17,97.73Z"
          transform="translate(-690.31 -91.09)"
        />
        <path
          d="M753.15,92.81A0.9,0.9,0,0,1,753,93a0.36,0.36,0,0,1-.22.06,0.5,0.5,0,0,1-.27-0.08l-0.31-.19a2.39,2.39,0,0,0-.43-0.19,2,2,0,0,0-.62-0.08,1.91,1.91,0,0,0-.83.17,1.58,1.58,0,0,0-.59.49,2.23,2.23,0,0,0-.35.78,4.21,4.21,0,0,0-.12,1,4,4,0,0,0,.13,1.07,2.28,2.28,0,0,0,.37.79,1.59,1.59,0,0,0,.58.48,1.77,1.77,0,0,0,.77.16,1.91,1.91,0,0,0,.7-0.11,2.21,2.21,0,0,0,.45-0.23l0.32-.23a0.48,0.48,0,0,1,.3-0.11,0.36,0.36,0,0,1,.33.17l0.52,0.66a3.25,3.25,0,0,1-.65.59,3.49,3.49,0,0,1-.73.38,3.68,3.68,0,0,1-.78.2,5.58,5.58,0,0,1-.8.06,3.32,3.32,0,0,1-1.31-.26,3,3,0,0,1-1.07-.76,3.65,3.65,0,0,1-.72-1.22,4.69,4.69,0,0,1-.27-1.64,4.76,4.76,0,0,1,.24-1.53,3.46,3.46,0,0,1,.7-1.22,3.2,3.2,0,0,1,1.14-.81,3.92,3.92,0,0,1,1.56-.29,3.71,3.71,0,0,1,1.47.27,3.59,3.59,0,0,1,1.14.77Z"
          transform="translate(-690.31 -91.09)"
        />
        <path
          d="M760.72,98.72h-0.81a0.87,0.87,0,0,1-.4-0.08,0.49,0.49,0,0,1-.22-0.31l-0.16-.53a6.24,6.24,0,0,1-.56.45,3.36,3.36,0,0,1-.57.32,2.9,2.9,0,0,1-.62.2,3.76,3.76,0,0,1-.73.07,2.87,2.87,0,0,1-.88-0.13,1.88,1.88,0,0,1-.69-0.38,1.74,1.74,0,0,1-.45-0.64,2.26,2.26,0,0,1-.16-0.89A1.75,1.75,0,0,1,754.7,96a2.1,2.1,0,0,1,.74-0.75,4.73,4.73,0,0,1,1.38-.55,8.82,8.82,0,0,1,2.14-.22V94a1.68,1.68,0,0,0-.32-1.12,1.16,1.16,0,0,0-.92-0.36,2.23,2.23,0,0,0-.73.1,2.79,2.79,0,0,0-.51.23l-0.4.23a0.81,0.81,0,0,1-.4.1,0.52,0.52,0,0,1-.31-0.09,0.74,0.74,0,0,1-.21-0.23l-0.33-.58a4.45,4.45,0,0,1,3.12-1.18,3,3,0,0,1,1.17.22,2.49,2.49,0,0,1,.87.6,2.56,2.56,0,0,1,.54.92,3.52,3.52,0,0,1,.19,1.17v4.73Zm-3.5-1.12a2.42,2.42,0,0,0,.51-0.05,1.92,1.92,0,0,0,.44-0.15,2.32,2.32,0,0,0,.4-0.25A3.65,3.65,0,0,0,759,96.8V95.54a7.31,7.31,0,0,0-1.32.1,3.51,3.51,0,0,0-.85.25,1.09,1.09,0,0,0-.46.36,0.8,0.8,0,0,0-.13.45,0.79,0.79,0,0,0,.28.68A1.21,1.21,0,0,0,757.22,97.59Z"
          transform="translate(-690.31 -91.09)"
        />
      </g>
      <circle cx="76.73" cy="22.61" r="7.62" fill="#00ca4e" />
      <circle cx="20.24" cy="22.61" r="7.62" fill="#ff605c" />
      <circle cx="48.48" cy="22.61" r="7.62" fill="#ffbd44" />
      <g ref={poopRef}>
        <text
          transform="translate(155.93 275.76)"
          font-size="39.48"
          fill="#282828"
          font-family="Lato"
          font-weight="700"
        >
          <tspan letter-spacing="-1">W</tspan>
          <tspan x="39.37" y="0">
            aterlo
          </tspan>
          <tspan x="145.7" y="0">
            oW
          </tspan>
          <tspan x="207.85" y="0">
            orks
          </tspan>
        </text>
        <g>
          <path
            d="M377.43,252.18H365.79a13.62,13.62,0,0,0-8.69-24.12h-0.72a13.53,13.53,0,0,0,2.58-8q0-.24,0-0.47a1.57,1.57,0,0,0-3.13.11q0,0.18,0,.36a10.43,10.43,0,0,1-4.09,8.31,1.57,1.57,0,0,0,1,2.81h4.41a10.49,10.49,0,0,1,0,21H299.73a10.49,10.49,0,1,1,0-21h14.61a1.57,1.57,0,0,0,0-3.13H304.7a10.49,10.49,0,0,1,6.8-18.48h3.64a1.57,1.57,0,0,0,1.39-2.29,17.14,17.14,0,0,1-1.94-8A17.43,17.43,0,0,1,329,182.25a20.49,20.49,0,0,0,6.78,24.2h-4.4a1.57,1.57,0,1,0,0,3.13h14a10.47,10.47,0,0,1,9.31,5.64,1.57,1.57,0,0,0,2.78-1.45,13.6,13.6,0,0,0-12.08-7.32h-2.86A17.34,17.34,0,0,1,333,181.22a1.57,1.57,0,0,0-1.38-2.36,20.47,20.47,0,0,0-20.12,20.46,20.58,20.58,0,0,0,1.28,7.12H311.5a13.64,13.64,0,0,0-11.05,21.62h-0.72A13.62,13.62,0,0,0,291,252.18H279.41a1.57,1.57,0,0,0,0,3.13h98A1.57,1.57,0,1,0,377.43,252.18Z"
            transform="translate(-29.77 -30.87)"
            fill="#282828"
          />
          <path
            d="M322.67,228.06h-3.2a1.57,1.57,0,0,0,0,3.13h3.2A1.57,1.57,0,0,0,322.67,228.06Z"
            transform="translate(-29.77 -30.87)"
            fill="#282828"
          />
        </g>
      </g>

      <rect
        ref={paperTopRef}
        x="69.54"
        y="119.13"
        width="443.53"
        height="166.04"
        rx="8"
        ry="8"
        fill="#fff"
      />
      <rect
        ref={companyLogoRef}
        x="94.58"
        y="139.35"
        width="122.93"
        height="122.93"
        rx="8"
        ry="8"
        fill="#e82127"
      />
      <g>
        <rect
          ref={statsBackgroundRef}
          x="313.82"
          y="139.35"
          width="177.96"
          height="122.93"
          rx="8"
          ry="8"
          fill={BackgroundColor.darker}
        />
        <rect
          ref={whitePillar1Ref}
          x="324.69"
          y="148.45"
          width="19.91"
          height="101.67"
          rx="9.96"
          ry="9.96"
          fill="#fff"
        />
        <rect
          ref={whitePillar2Ref}
          x="353.15"
          y="148.45"
          width="19.91"
          height="101.67"
          rx="9.96"
          ry="9.96"
          fill="#fff"
        />
        <rect
          ref={whitePillar3Ref}
          x="382.47"
          y="148.45"
          width="19.91"
          height="101.67"
          rx="9.96"
          ry="9.96"
          fill="#fff"
        />
        <rect
          ref={innerPillar1Ref}
          x="327.8"
          y="157"
          width="13.71"
          height="90.02"
          rx="6.85"
          ry="6.85"
          fill={Color.rating}
        />
        <rect
          ref={innerPillar2Ref}
          x="356.30"
          y="171.93"
          width="13.71"
          height="75.09"
          rx="6.85"
          ry="6.85"
          fill={Color.salary}
        />
        <rect
          ref={innerPillar3Ref}
          x="385.5"
          y="187"
          width="13.71"
          height="59.69"
          rx="6.85"
          ry="6.85"
          fill={Color.interview}
        />
        <rect
          ref={stat1BoxRef}
          x="442.67"
          y="179.58"
          width="69.13"
          height="32.08"
          rx="6.85"
          ry="6.85"
          transform="translate(924.7 360.37) rotate(180)"
          fill={Color.rating}
        />
        <rect
          ref={stat2BoxRef}
          x="442.67"
          y="214.7"
          width="69.13"
          height="32.08"
          rx="6.85"
          ry="6.85"
          transform="translate(924.7 430.61) rotate(180)"
          fill={Color.salary}
        />
        <rect
          ref={stat3BoxRef}
          x="442.67"
          y="249.82"
          width="69.13"
          height="32.08"
          rx="6.85"
          ry="6.85"
          transform="translate(924.7 500.85) rotate(180)"
          fill={Color.interview}
        />
        <path
          ref={stat1IconRef}
          d="M457.62,199.17l4.46,2.7-1.19-5.05,3.92-3.41-5.17-.45-2-4.77v11Zm-7,6.22,1.85-8L446.26,192l8.18-.71,3.18-7.52,3.18,7.52L469,192l-6.19,5.37,1.85,8-7-4.23Z"
          transform="translate(-29.77 -30.87)"
          fill="#fff"
        />
        <path
          ref={stat2IconRef}
          d="M457.18,240.91V238.4a5.41,5.41,0,0,1-2.79-1.3,5.65,5.65,0,0,1-1.57-2.53l1.67-.69A4.36,4.36,0,0,0,456,236a4.18,4.18,0,0,0,4.66,0,2.36,2.36,0,0,0,.93-2,2.55,2.55,0,0,0-.82-2,9.58,9.58,0,0,0-3.09-1.46,7.4,7.4,0,0,1-3.21-1.82,4,4,0,0,1-1.06-2.84,3.82,3.82,0,0,1,1.06-2.75,4.19,4.19,0,0,1,2.76-1.26v-2.48H459v2.48a4.61,4.61,0,0,1,2.32.88,4.7,4.7,0,0,1,1.48,1.87l-1.67.72A3,3,0,0,0,460,224a4.11,4.11,0,0,0-4,.19,2,2,0,0,0-.81,1.7,2.22,2.22,0,0,0,.9,1.84,11.15,11.15,0,0,0,3.32,1.45,6.1,6.1,0,0,1,3,1.81,4.53,4.53,0,0,1,1,3,4.19,4.19,0,0,1-1.11,3,5.53,5.53,0,0,1-3.26,1.48v2.48h-1.79Z"
          transform="translate(-29.77 -30.87)"
          fill="#fff"
        />
        <path
          ref={stat3IconRef}
          d="M453.05,270.93h10.51v-0.66a2.53,2.53,0,0,0-1.41-2.27,9.35,9.35,0,0,0-7.7,0,2.53,2.53,0,0,0-1.41,2.27v0.66Zm5.26-5.48a2.41,2.41,0,1,0-1.8-.7A2.44,2.44,0,0,0,458.31,265.45Zm-8.14,10.42A1.92,1.92,0,0,1,448.3,274V257.72a1.92,1.92,0,0,1,1.88-1.88h16.27a1.92,1.92,0,0,1,1.88,1.88v6.73l5-5v12.83l-5-5V274a1.92,1.92,0,0,1-1.88,1.88H450.18Zm0-1.88h16.27V257.72H450.18V274Zm0,0v0Z"
          transform="translate(-29.77 -30.87)"
          fill="#fff"
        />
      </g>
      <g>
        <path
          ref={paperBottomRef}
          d="M77.54,289.19H505.07a8,8,0,0,1,8,8v48.69a0,0,0,0,1,0,0H69.54a0,0,0,0,1,0,0V297.19A8,8,0,0,1,77.54,289.19Z"
          fill="#fff"
        />
        <g ref={techIcon1Ref}>
          <circle cx="113.08" cy="317.54" r="3.37" fill="#61dafb" />
          <path
            d="M155.65,342.85c-0.65-.24-1.33-0.47-2-0.68,0.18-.71.33-1.42,0.44-2.1,0.62-3.9-.06-6.65-2-7.71a3.67,3.67,0,0,0-1.89-.47c-2.07,0-4.7,1.54-7.36,4.11-2.66-2.57-5.29-4.11-7.36-4.11a3.67,3.67,0,0,0-1.89.47c-1.89,1.09-2.57,3.84-2,7.71,0.12,0.68.27,1.39,0.44,2.1a20.61,20.61,0,0,0-2,.68c-3.69,1.42-5.7,3.37-5.7,5.56s2,4.14,5.7,5.56c0.65,0.24,1.33.47,2,.68-0.18.71-.33,1.42-0.44,2.1-0.62,3.9.06,6.65,2,7.71a3.67,3.67,0,0,0,1.89.47c2.1,0,4.73-1.54,7.36-4.11,2.66,2.57,5.29,4.11,7.36,4.11a3.67,3.67,0,0,0,1.89-.47c1.89-1.09,2.57-3.84,2-7.71-0.12-.68-0.27-1.39-0.44-2.1a20.61,20.61,0,0,0,2-.68c3.69-1.42,5.7-3.37,5.7-5.56S159.34,344.27,155.65,342.85Zm-4.37-9c1.21,0.71,1.63,2.9,1.12,6a17.8,17.8,0,0,1-.41,2,35.11,35.11,0,0,0-4.88-.74,42.64,42.64,0,0,0-3.07-3.84c2.19-2.16,4.4-3.63,6.21-3.63A2,2,0,0,1,151.27,333.84ZM148,351.36c-0.53.95-1.15,1.89-1.8,2.84-1.09.09-2.19,0.12-3.31,0.12s-2.25,0-3.31-.12q-1-1.42-1.77-2.84c-0.56-1-1.09-2-1.57-3,0.47-1,1-2,1.57-3s1.15-1.89,1.8-2.84c1.09-.09,2.19-0.12,3.31-0.12s2.25,0,3.31.12q1,1.42,1.77,2.84c0.56,1,1.09,2,1.57,3C149,349.38,148.52,350.36,148,351.36Zm2.45-1c0.44,1,.8,2,1.12,3-1,.24-2.07.41-3.19,0.56,0.35-.56.74-1.15,1.06-1.77S150.09,351,150.42,350.39Zm-7.57,8c-0.71-.77-1.39-1.6-2-2.45,0.68,0,1.36.06,2,.06s1.36,0,2-.06C144.24,356.8,143.56,357.63,142.85,358.39Zm-5.5-4.43c-1.12-.15-2.19-0.33-3.19-0.56,0.33-1,.68-2,1.12-3,0.33,0.59.65,1.21,1,1.8S137,353.37,137.35,354Zm-2.07-7.54c-0.44-1-.8-2-1.12-3,1-.24,2.07-0.41,3.19-0.56-0.35.56-.74,1.15-1.06,1.77S135.61,345.83,135.29,346.43Zm7.57-8c0.71,0.77,1.39,1.6,2,2.45-0.68,0-1.36-.06-2-0.06s-1.36,0-2,.06C141.46,340,142.14,339.19,142.85,338.42Zm6.56,6.21-1.06-1.77c1.12,0.15,2.19.33,3.19,0.56-0.33,1-.68,2-1.12,3C150.09,345.83,149.77,345.21,149.41,344.62Zm-16.11-4.79c-0.5-3.1-.09-5.29,1.12-6a2,2,0,0,1,1-.27c1.77,0,4,1.45,6.21,3.63A38.85,38.85,0,0,0,138.6,341a40.18,40.18,0,0,0-4.88.74C133.54,341.11,133.42,340.46,133.31,339.84Zm-7.3,8.57c0-1.39,1.68-2.87,4.64-4a17.72,17.72,0,0,1,1.89-.62,43.08,43.08,0,0,0,1.77,4.61,37.24,37.24,0,0,0-1.77,4.58C128.46,351.83,126,350.06,126,348.41ZM134.43,363c-1.21-.71-1.63-2.9-1.12-6a17.8,17.8,0,0,1,.41-2,35.11,35.11,0,0,0,4.88.74,42.64,42.64,0,0,0,3.07,3.84c-2.19,2.16-4.4,3.63-6.21,3.63A2,2,0,0,1,134.43,363Zm18-6c0.5,3.1.09,5.29-1.12,6a2,2,0,0,1-1,.27c-1.77,0-4-1.45-6.21-3.63a38.85,38.85,0,0,0,3.07-3.84A40.18,40.18,0,0,0,152,355C152.16,355.71,152.28,356.36,152.4,357Zm2.66-4.61a17.72,17.72,0,0,1-1.89.62,43.07,43.07,0,0,0-1.77-4.61,37.24,37.24,0,0,0,1.77-4.58c4.08,1.18,6.53,3,6.53,4.61C159.7,349.79,158,351.27,155.06,352.37Z"
            transform="translate(-29.77 -30.87)"
            fill="#61dafb"
          />
        </g>
        <g ref={techIcon2Ref}>
          <path
            d="M182.87,357.85s-1.46.85,1,1.14a21.94,21.94,0,0,0,7.94-.34,13.91,13.91,0,0,0,2.11,1C186.46,362.9,177,359.5,182.87,357.85Zm-0.92-4.2s-1.64,1.22.87,1.48a31,31,0,0,0,10.24-.49,4.53,4.53,0,0,0,1.58,1C185.57,358.25,175.46,355.81,182,353.65Z"
            transform="translate(-29.77 -30.87)"
            fill="#0074bd"
          />
          <path
            d="M189.68,346.53c1.85,2.13-.49,4-0.49,4s4.7-2.42,2.54-5.46c-2-2.83-3.56-4.24,4.8-9.09C196.54,336,183.42,339.31,189.68,346.53Z"
            transform="translate(-29.77 -30.87)"
            fill="#ea2d2e"
          />
          <path
            d="M199.61,361s1.08,0.89-1.19,1.58c-4.33,1.31-18,1.71-21.84.05-1.37-.6,1.2-1.42,2-1.59a5.24,5.24,0,0,1,1.32-.15c-1.52-1.07-9.83,2.1-4.22,3C191,366.34,203.58,362.75,199.61,361Zm-16-11.65s-7,1.66-2.47,2.26a52.34,52.34,0,0,0,9.22-.1c2.88-.24,5.78-0.76,5.78-0.76a12.3,12.3,0,0,0-1.75.94c-7.08,1.86-20.75,1-16.81-.91A13.17,13.17,0,0,1,183.57,349.3Zm12.5,7c7.19-3.74,3.87-7.33,1.55-6.84a5.39,5.39,0,0,0-.82.22,1.31,1.31,0,0,1,.61-0.47c4.59-1.61,8.12,4.76-1.48,7.29A0.65,0.65,0,0,0,196.07,356.29Z"
            transform="translate(-29.77 -30.87)"
            fill="#0074bd"
          />
          <path
            d="M191.74,328.2s4,4-3.78,10.11c-6.22,4.92-1.42,7.72,0,10.92-3.63-3.28-6.3-6.16-4.51-8.85C186.07,336.44,193.34,334.53,191.74,328.2Z"
            transform="translate(-29.77 -30.87)"
            fill="#ea2d2e"
          />
        </g>
        <path
          ref={techIcon3Ref}
          d="M244,359.22a10.4,10.4,0,0,0-4.39.62,1.1,1.1,0,0,0-.93.57,4,4,0,0,1,.36.72,5.71,5.71,0,0,0,1.19,1.4c0.47,0.35.95,0.73,1.45,1,0.89,0.54,1.88.85,2.74,1.4,0.5,0.32,1,.72,1.5,1.09a2.91,2.91,0,0,0,.72.57v-0.05c-0.17-.21-0.21-0.5-0.36-0.72l-0.67-.67a11,11,0,0,0-2.38-2.27c-0.71-.51-2.29-1.19-2.58-2l-0.05-.05a11.36,11.36,0,0,0,1.55-.36c0.78-.21,1.47-0.15,2.27-0.36l1.09-.31v-0.21c-0.41-.42-0.69-1-1.14-1.34a33.25,33.25,0,0,0-3.72-2.79c-0.72-.46-1.61-0.75-2.38-1.14a2.75,2.75,0,0,1-.88-0.41,10.91,10.91,0,0,1-.93-1.76c-0.65-1.25-1.29-2.61-1.86-3.93a21.13,21.13,0,0,0-1.14-2.58,22.83,22.83,0,0,0-8.79-8.48,10.55,10.55,0,0,0-2.9-.93l-1.71-.1a9,9,0,0,1-1-.78c-1.3-.82-4.62-2.6-5.58-0.26-0.61,1.48.91,2.92,1.45,3.67a11.06,11.06,0,0,1,1.14,1.71c0.18,0.39.21,0.78,0.36,1.19a27.24,27.24,0,0,0,1.19,3,10.75,10.75,0,0,0,.83,1.4,1.61,1.61,0,0,1,.57.78,6.32,6.32,0,0,0-.52,1.71,9.9,9.9,0,0,0,.67,7.6c0.36,0.58,1.21,1.82,2.38,1.34s0.79-1.71,1.09-2.84a1.66,1.66,0,0,1,.15-0.62v0.05l0.93,1.86a12.66,12.66,0,0,0,2.95,3.05,6.63,6.63,0,0,0,1.65,1.34V360.3H228.2a2.92,2.92,0,0,0-.52-0.46,11.83,11.83,0,0,1-1.19-1.34,31.45,31.45,0,0,1-2.53-4.14c-0.36-.7-0.68-1.46-1-2.17a1.63,1.63,0,0,0-.36-0.83,10.31,10.31,0,0,0-1.09,1.55,13.29,13.29,0,0,0-.62,3.41,0.18,0.18,0,0,0-.1.05,2.17,2.17,0,0,1-1.24-1.55,9.77,9.77,0,0,1-.21-6c0.15-.48.85-2,0.57-2.43a3.83,3.83,0,0,0-.83-1,8.15,8.15,0,0,1-.83-1.45c-0.55-1.25-.81-2.66-1.4-3.93a11.49,11.49,0,0,0-1.14-1.76,10.29,10.29,0,0,1-1.24-1.76,1.06,1.06,0,0,1-.1-0.93,0.41,0.41,0,0,1,.31-0.31,2.07,2.07,0,0,1,1.45.21,12.61,12.61,0,0,1,2.22,1.14,4.74,4.74,0,0,0,1.09.78h0.47c0.73,0.17,1.54.05,2.22,0.26a13.43,13.43,0,0,1,3.26,1.55,20.16,20.16,0,0,1,7.08,7.75c0.27,0.51.38,1,.62,1.55,0.48,1.1,1.08,2.23,1.55,3.31a15.45,15.45,0,0,0,1.6,3c0.35,0.47,1.71.72,2.33,1a13.71,13.71,0,0,1,1.55.62c0.78,0.47,1.54,1,2.27,1.55C242.78,358.19,243.91,358.75,244,359.22Zm-23.11-19.69a3.7,3.7,0,0,0-.93.1v0.05H220a7.12,7.12,0,0,0,.72.93l0.52,1.09,0.05-.05a1.26,1.26,0,0,0,.46-1.14,3.43,3.43,0,0,1-.26-0.46A4.2,4.2,0,0,0,220.86,339.53Z"
          transform="translate(-29.77 -30.87)"
          fill="#00618a"
        />
        <path
          ref={techIcon4Ref}
          d="M301,343.81a7.37,7.37,0,0,0-5.6-.53,7.65,7.65,0,0,0-3-4.88l-0.61-.49-0.53.61a6.52,6.52,0,0,0-1.17,4.65,6.33,6.33,0,0,0,1.14,3.14,11.69,11.69,0,0,1-1.63.91,10.37,10.37,0,0,1-3.37.76h-2.54v-5.34h-4.92v-9.46h-5.68v4.54h-9.46v4.92H258.7v5.3h-4.24l-0.08.57a13.91,13.91,0,0,0,1.14,7l0.42,0.83,0,0.08c3,5.07,8.21,7.19,13.92,7.19,11,0,20.17-5,24.33-15.36,2.8,0.15,5.68-.68,7-3.37l0.34-.68Zm-36.63-5h3.78V343h-3.78v-4.16Zm5,16.72a1.17,1.17,0,1,1-1.17-1.17A1.2,1.2,0,0,1,269.34,355.58Zm-5-11.81h3.78v4.16h-3.78v-4.16Zm-4.92,0h4.16v4.16h-4.16v-4.16Zm10.48,19c-6,0-9.19-2-11.84-4.69,0.79,0,1.55.08,2.23,0.08s1.21,0,1.78,0a17.38,17.38,0,0,0,3.82-.57,10.29,10.29,0,0,0,5.3,5.22h-1.29Zm3.14-14.83h-4.16v-4.16h4.16v4.16Zm0-4.92h-4.16v-4.16h4.16V343Zm4.92,4.92h-4.16v-4.16H278v4.16Zm0-4.92h-4.16v-4.16H278V343Zm0-4.92h-4.16v-4.16H278v4.16Zm4.92,9.84h-4.16v-4.16h4.16v4.16Zm-14.45,6.89a0.71,0.71,0,0,0-.3-0.08,0.83,0.83,0,1,0,.83.83,0.71,0.71,0,0,0-.08-0.3,0.34,0.34,0,0,1-.64-0.15A0.47,0.47,0,0,1,268.47,354.82Z"
          transform="translate(-29.77 -30.87)"
          fill="#019bc6"
        />
      </g>
      <g
        ref={teslaTRef}
        id="bf79f021-b525-4c37-a922-6451d93ee8b8"
        data-name="T"
      >
        <path
          id="3bf253a6-3184-4e00-9365-f23d3226eb6d"
          data-name="path35"
          d="M185.82,264.83l8.4-47.25c8,0,10.53.88,10.9,4.46,0,0,5.37-2,8.08-6.07a59.37,59.37,0,0,0-21.2-5.12l-6.2,7.55h0l-6.2-7.55a59.36,59.36,0,0,0-21.2,5.12c2.71,4.07,8.08,6.07,8.08,6.07,0.37-3.58,2.89-4.46,10.84-4.47l8.47,47.26"
          transform="translate(-29.77 -30.87)"
          fill="#fff"
        />
        <path
          id="9c1e340b-d2f7-4f5d-b241-7e540d3f1383"
          data-name="path37"
          d="M185.82,208.67a69.22,69.22,0,0,1,28.34,5.69,23,23,0,0,0,1.68-3.47,80,80,0,0,0-60.05,0,29.05,29.05,0,0,0,1.68,3.47,69.21,69.21,0,0,1,28.34-5.69h0"
          transform="translate(-29.77 -30.87)"
          fill="#fff"
        />
      </g>

      <mask id="extensionMask">
        <path
          transform-origin="center"
          d="M595.45,120.43h-5l-9.64-9.64-9.64,9.64H432.58a8,8,0,0,0-8,8v170.2a8,8,0,0,0,8,8H595.45a8,8,0,0,0,8-8V128.43A8,8,0,0,0,595.45,120.43Z"
          transform="translate(-29.77 -30.87)"
          fill="white"
        />
      </mask>
      <g ref={extensionPopoutRef}>
        <path
          transform-origin="center"
          d="M595.45,120.43h-5l-9.64-9.64-9.64,9.64H432.58a8,8,0,0,0-8,8v170.2a8,8,0,0,0,8,8H595.45a8,8,0,0,0,8-8V128.43A8,8,0,0,0,595.45,120.43Z"
          transform="translate(-29.77 -30.87)"
          fill="#008ae6"
        />
        <circle
          stroke-dasharray="400 400"
          ref={circularProgressRef}
          cx="484.24"
          cy="182.66"
          r="55.58"
          fill="none"
          stroke="#fff"
          stroke-miterlimit="10"
          stroke-width="8"
        />
        <text
          transform="translate(453.65 186.22)"
          font-size="12.63"
          fill="#fff"
          font-family="Lato"
          font-weight="700"
        >
          SCRAPING
        </text>
        <circle
          ref={greenCircleExpandRef}
          cx="484.24"
          cy="182.66"
          r="200"
          fill="#00CA4E"
          mask="url(#extensionMask)"
        />
        <polyline
          stroke-dasharray="400 400"
          ref={checkmarkRef}
          strokeLinecap="round"
          points="464.87 182.87 476.31 194.31 503.61 167.01"
          fill="none"
          stroke="#fff"
          stroke-miterlimit="10"
          stroke-width="8"
        />
      </g>
    </svg>
  );
};
