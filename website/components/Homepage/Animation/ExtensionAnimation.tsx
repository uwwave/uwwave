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
  const headerContentRef = useRef<SVGGElement>(null);
  const bodyBackgroundRef = useRef<SVGRectElement>(null);
  const ratingReviewPaperRef = useRef<SVGRectElement>(null);
  const ratingTextTopRef = useRef<SVGRectElement>(null);
  const ratingTextBottomRef = useRef<SVGRectElement>(null);
  const ratingStar5Ref = useRef<SVGPathElement>(null);
  const ratingStar1Ref = useRef<SVGPathElement>(null);
  const ratingStar2Ref = useRef<SVGPathElement>(null);
  const ratingStar3Ref = useRef<SVGPathElement>(null);
  const ratingStar4Ref = useRef<SVGPathElement>(null);
  const ratingThumbDownRef = useRef<SVGPathElement>(null);
  const ratingThumbUpRef = useRef<SVGPathElement>(null);
  const ratingThumbUpValueRef = useRef<SVGPathElement>(null);
  const ratingThumbDownValueRef = useRef<SVGPathElement>(null);
  const ratingReviewProfileBGRef = useRef<SVGRectElement>(null);
  const ratingReviewUWLogoRef = useRef<SVGGElement>(null);
  const interviewPaperRef = useRef<SVGRectElement>(null);
  const interviewStar1Ref = useRef<SVGPathElement>(null);
  const interviewStar2Ref = useRef<SVGPathElement>(null);
  const interviewStar3Ref = useRef<SVGPathElement>(null);
  const interviewStar4Ref = useRef<SVGPathElement>(null);
  const interviewStar5Ref = useRef<SVGPathElement>(null);
  const interviewThumbUpRef = useRef<SVGPathElement>(null);
  const interviewThumbUpValRef = useRef<SVGPathElement>(null);
  const interviewThumbUpBGRef = useRef<SVGRectElement>(null);
  const interviewThumbDownRef = useRef<SVGPathElement>(null);
  const interviewProfileBGRef = useRef<SVGRectElement>(null);
  const topLeetcodeIconRef = useRef<SVGGElement>(null);
  const bottomLeetcodeIconRef = useRef<SVGGElement>(null);
  const topLeetCodeTextElementRef = useRef<SVGRectElement>(null);
  const bottomLeetCodeTextElementRef = useRef<SVGRectElement>(null);
  const gooseProfileRef = useRef<SVGGElement>(null);
  const interviewThumbUpPressedRef = useRef<SVGPathElement>(null);
  const interviewThumbUpPressedValueRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const TL = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      //IN TRANSITION
      const inTween = gsap.from(comp.current, {
        opacity: 0,
        translateY: -40,
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

      //PAGE SCROLL TIMELINE
      const pageScrollTL = gsap.timeline();
      const scrollHeaderContent = gsap.to(headerContentRef.current, {
        translateY: -240,
        ease: "power3.out",
        duration: 0.8,
      });
      const scrollBodyBG = gsap.to(bodyBackgroundRef.current, {
        translateY: -240,
        ease: "power3.out",
        duration: 0.8,
        height: 240,
      });
      pageScrollTL.add(scrollHeaderContent);
      pageScrollTL.add(scrollBodyBG, "<");

      //SHOW RATING REVIEW
      const ratingReviewTL = gsap.timeline();
      const showRatingsPaper = gsap.from(ratingReviewPaperRef.current, {
        transformOrigin: "top",
        scale: 0,
        ease: "back",
        duration: 0.4,
      });
      const showRatingProfileBG = gsap.from(ratingReviewProfileBGRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.4,
      });
      const showRatingProfile = gsap.from(ratingReviewUWLogoRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.4,
      });
      const showRatingStar1 = gsap.from(ratingStar1Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showRatingStar2 = gsap.from(ratingStar2Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showRatingStar3 = gsap.from(ratingStar3Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showRatingStar4 = gsap.from(ratingStar4Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showRatingStar5 = gsap.from(ratingStar5Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showRatingReviewLine1 = gsap.from(ratingTextTopRef.current, {
        width: 0,
        ease: "power3.out",
      });
      const showRatingReviewLine2 = gsap.from(ratingTextBottomRef.current, {
        width: 0,
        ease: "power3.out",
      });
      const showRatingThumbsUp = gsap.from(ratingThumbUpRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: 90,
      });
      const showRatingThumbsUpText = gsap.from(ratingThumbUpValueRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
      });
      const showRatingThumbsDown = gsap.from(ratingThumbDownRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: 90,
      });
      const showRatingThumbsDownText = gsap.from(
        ratingThumbDownValueRef.current,
        { transformOrigin: "center", scale: 0, ease: "back", duration: 0.3 }
      );

      ratingReviewTL.add(showRatingsPaper);
      ratingReviewTL.add(showRatingProfileBG, ">-=0.2");
      ratingReviewTL.add(showRatingProfile, "<");
      ratingReviewTL.add(showRatingStar1, ">-=0.2");
      ratingReviewTL.add(showRatingStar2, ">-=0.2");
      ratingReviewTL.add(showRatingStar3, ">-=0.2");
      ratingReviewTL.add(showRatingStar4, ">-=0.2");
      ratingReviewTL.add(showRatingStar5, ">-=0.2");
      ratingReviewTL.add(showRatingReviewLine1, ">-=0.4");
      ratingReviewTL.add(showRatingReviewLine2, ">-=0.2");
      ratingReviewTL.add(showRatingThumbsUp, ">-=0.4");
      ratingReviewTL.add(showRatingThumbsUpText, ">-=0.2");
      ratingReviewTL.add(showRatingThumbsDown, ">-=0.2");
      ratingReviewTL.add(showRatingThumbsDownText, ">-=0.2");

      //SHOW INTERVIEW REVIEW
      const interviewReviewTL = gsap.timeline();
      const showInterviewPaper = gsap.from(interviewPaperRef.current, {
        transformOrigin: "top",
        scale: 0,
        ease: "back",
        duration: 0.4,
      });
      const showInterviewProfileBG = gsap.from(interviewProfileBGRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.4,
      });
      const showInterviewProfile = gsap.from(gooseProfileRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "power3.out",
        duration: 0.4,
      });
      const showInterviewStar1 = gsap.from(interviewStar1Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showInterviewStar2 = gsap.from(interviewStar2Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showInterviewStar3 = gsap.from(interviewStar3Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showInterviewStar4 = gsap.from(interviewStar4Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showInterviewStar5 = gsap.from(interviewStar5Ref.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
        rotate: -90,
      });
      const showInterviewTopTechLogo = gsap.from(topLeetcodeIconRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
      });
      const showInterviewTopText = gsap.from(
        topLeetCodeTextElementRef.current,
        { width: 0, ease: "power3.out", duration: 0.3 }
      );
      const showInterviewBottomTechLogo = gsap.from(
        bottomLeetcodeIconRef.current,
        { transformOrigin: "center", scale: 0, ease: "back", duration: 0.3 }
      );
      const showInterviewBottomText = gsap.from(
        bottomLeetCodeTextElementRef.current,
        { width: 0, ease: "power3.out", duration: 0.3 }
      );
      const showInterviewThumbUp = gsap.from(interviewThumbUpRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
      });
      const showInterviewThumbUpVal = gsap.from(
        interviewThumbUpValRef.current,
        { transformOrigin: "center", scale: 0, ease: "back", duration: 0.3 }
      );
      const showInterviewThumbDown = gsap.from(interviewThumbDownRef.current, {
        transformOrigin: "center",
        scale: 0,
        ease: "back",
        duration: 0.3,
      });
      const showInterviewThumbUpButtonPressed = gsap.from(
        interviewThumbUpBGRef.current,
        { transformOrigin: "center", scale: 0, ease: "back", duration: 0.3 }
      );
      const showInterviewThumbUpPressed = gsap.from(
        interviewThumbUpPressedRef.current,
        {
          transformOrigin: "center",
          scale: 0,
          ease: "back",
          duration: 0.3,
          rotation: 90,
        }
      );
      const showInterviewThumbUpButtonPressedValReady = gsap.from(
        interviewThumbUpPressedValueRef.current,
        { duration: 0, opacity: 0 }
      );
      const showInterviewThumbUpButtonPressedVal = gsap.from(
        interviewThumbUpPressedValueRef.current,
        { translateY: -433, ease: "power3.out" }
      );

      interviewReviewTL.add(showInterviewPaper);
      interviewReviewTL.add(showInterviewProfileBG, ">-=0.2");
      interviewReviewTL.add(showInterviewProfile, "<+=0.2");
      interviewReviewTL.add(showInterviewStar1, ">-=0.2");
      interviewReviewTL.add(showInterviewStar2, ">-=0.2");
      interviewReviewTL.add(showInterviewStar3, ">-=0.2");
      interviewReviewTL.add(showInterviewStar4, ">-=0.2");
      interviewReviewTL.add(showInterviewStar5, ">-=0.2");
      interviewReviewTL.add(showInterviewTopTechLogo, ">-=0.2");
      interviewReviewTL.add(showInterviewTopText, ">-=0.2");
      interviewReviewTL.add(showInterviewBottomTechLogo, ">-=0.4");
      interviewReviewTL.add(showInterviewBottomText, ">-=0.2");
      interviewReviewTL.add(showInterviewThumbUp, ">-=0.2");
      interviewReviewTL.add(showInterviewThumbUpVal, ">-=0.2");
      interviewReviewTL.add(showInterviewThumbDown, ">-=0.2");
      interviewReviewTL.add(showInterviewThumbUpButtonPressed, ">+=0.1");
      interviewReviewTL.add(showInterviewThumbUpPressed, ">-=0.2");
      interviewReviewTL.add(
        showInterviewThumbUpButtonPressedValReady,
        ">-=0.2"
      );
      interviewReviewTL.add(showInterviewThumbUpButtonPressedVal, ">");

      const outTween = gsap.to(comp.current, {
        opacity: 0,
        translateY: 40,
        ease: "power3.out",
      });

      //Construct timeline
      TL.add(inTween);
      TL.add(extensionOpenTL, ">+=0.5");
      TL.add(changeThemeTL, ">-=0.8");
      TL.add(pagePaperTL, ">-=0.5");
      TL.add(extensionCloseTL, "<+=0.2");
      TL.add(companyLogoTL, "<");
      TL.add(statsTL, "<+=0.2");
      TL.add(techTL, "<+=0.4");
      TL.add(pageScrollTL, ">-=0.4");
      TL.add(ratingReviewTL, ">-=0.5");
      TL.add(interviewReviewTL, "<+=0.2");
      TL.add(outTween, ">+=1");
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

      <g ref={headerContentRef}>
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
      </g>
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
      <rect
        ref={bodyBackgroundRef}
        width="100%"
        height="0"
        y="347"
        fill={BackgroundColor.darker}
      />
      <defs>
        <clipPath id="clip-path" transform="translate(-29.77 -455.9)">
          <rect
            id="SVGID"
            x="112.42"
            y="668.32"
            width="59.06"
            height="59.06"
            transform="translate(283.89 1395.7) rotate(-180)"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient"
          x1="372.76"
          y1="352.73"
          x2="379.6"
          y2="358.54"
          gradientTransform="translate(600.83 1120.76) rotate(180) scale(1.19)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#0b0b09" />
          <stop offset="1" stop-color="#0b0b09" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="373.04"
          y1="273.5"
          x2="372.84"
          y2="272.66"
          gradientTransform="translate(609.36 1081.7) rotate(180) scale(1.19)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#6c6753" />
          <stop offset="1" stop-color="#6c6753" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-3"
          x1="372.75"
          y1="273.85"
          x2="372.75"
          y2="273.85"
          href="#linear-gradient-2"
        />
      </defs>
      <g id="ratingReview">
        <rect
          ref={ratingReviewPaperRef}
          x="69.54"
          y="119.66"
          width="443.53"
          height="78.32"
          rx="8"
          ry="8"
          fill="#fff"
        />
        <rect
          ref={ratingTextTopRef}
          x="265.13"
          y="148.35"
          width="121.03"
          height="7.49"
          rx="3.74"
          ry="3.74"
          fill="#d3d3d3"
        />
        <rect
          ref={ratingTextBottomRef}
          x="265.13"
          y="161.09"
          width="44.6"
          height="7.49"
          rx="3.74"
          ry="3.74"
          fill="#d3d3d3"
        />
        <path
          ref={ratingStar5Ref}
          d="M264.21,618.74l3.19-1.91,3.19,1.93-0.85-3.62,2.8-2.44-3.7-.33L267.4,609,266,612.36l-3.7.33,2.8,2.44Zm-1.83,2.54,1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38,2.28,5.38,5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <path
          ref={ratingStar1Ref}
          d="M181.73,621.28l1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38,2.28,5.38,5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <path
          ref={ratingStar2Ref}
          d="M201.89,621.28l1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38,2.28,5.38,5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <path
          ref={ratingStar3Ref}
          d="M222.06,621.28l1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38,2.28,5.38,5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <path
          ref={ratingStar4Ref}
          d="M242.22,621.28l1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38,2.28,5.38,5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <path
          ref={ratingThumbUpRef}
          d="M440.29,622.69h3.65v-11h-3.65v11Zm20.1-10a1.83,1.83,0,0,0-1.83-1.83h-5.76l0.87-4.17,0-.29a1.38,1.38,0,0,0-.4-1l-1-1-6,6a1.79,1.79,0,0,0-.54,1.29v9.14a1.83,1.83,0,0,0,1.83,1.83h8.22a1.81,1.81,0,0,0,1.68-1.11l2.76-6.44a1.8,1.8,0,0,0,.13-0.67v-1.83Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <path
          ref={ratingThumbDownRef}
          d="M501.19,608.42h-3.65v11h3.65v-11Zm-20.1,10a1.83,1.83,0,0,0,1.83,1.83h5.76l-0.87,4.17,0,0.29a1.38,1.38,0,0,0,.4,1l1,1,6-6a1.79,1.79,0,0,0,.54-1.29v-9.14a1.83,1.83,0,0,0-1.83-1.83h-8.22a1.81,1.81,0,0,0-1.68,1.11L481.22,616a1.8,1.8,0,0,0-.13.67v1.83Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <path
          ref={ratingThumbUpValueRef}
          d="M469.68,614.35a3.94,3.94,0,0,1-1.38-.24,3.33,3.33,0,0,1-1.15-.72,3.44,3.44,0,0,1-.79-1.16,4.28,4.28,0,0,1,0-3.17,3.91,3.91,0,0,1,.88-1.29,4.14,4.14,0,0,1,1.35-.87,4.58,4.58,0,0,1,1.72-.32,4.46,4.46,0,0,1,1.69.31,3.71,3.71,0,0,1,2.13,2.17,4.71,4.71,0,0,1,.29,1.69,5.23,5.23,0,0,1-.1,1.06,5.41,5.41,0,0,1-.3,1,7.91,7.91,0,0,1-.47,1q-0.27.47-.63,1l-3.15,4.54a0.83,0.83,0,0,1-.33.28,1.13,1.13,0,0,1-.5.1h-1.48l3.93-5.15,0.37-.5,0.32-.47a3.58,3.58,0,0,1-1.12.6A4.13,4.13,0,0,1,469.68,614.35Zm3.23-3.78a3,3,0,0,0-.19-1.1,2.41,2.41,0,0,0-.54-0.83,2.36,2.36,0,0,0-.82-0.53,2.84,2.84,0,0,0-1-.18,2.92,2.92,0,0,0-1.09.19,2.45,2.45,0,0,0-.84.54,2.36,2.36,0,0,0-.54.82,2.83,2.83,0,0,0-.19,1,3.17,3.17,0,0,0,.18,1.1,2.23,2.23,0,0,0,.5.82,2.12,2.12,0,0,0,.8.5,3.1,3.1,0,0,0,1.06.17,2.94,2.94,0,0,0,1.15-.21,2.56,2.56,0,0,0,.84-0.56,2.42,2.42,0,0,0,.52-0.81A2.6,2.6,0,0,0,472.91,610.57Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <path
          ref={ratingThumbDownValueRef}
          d="M511.25,606.58a4.68,4.68,0,0,1,1.53.24,3.53,3.53,0,0,1,1.23.71,3.32,3.32,0,0,1,.82,1.13,3.69,3.69,0,0,1,.3,1.52,4,4,0,0,1-.22,1.33,5.38,5.38,0,0,1-.59,1.18,8.6,8.6,0,0,1-.85,1.09q-0.48.53-1,1.08l-3.4,3.48a6.71,6.71,0,0,1,.73-0.16,4.57,4.57,0,0,1,.71-0.06h4.33a0.56,0.56,0,0,1,.42.15,0.54,0.54,0,0,1,.15.4v1h-8.62V619.1a1,1,0,0,1,.07-0.35,0.93,0.93,0,0,1,.22-0.33l4.14-4.16q0.51-.52.94-1a7.42,7.42,0,0,0,.73-1,4.52,4.52,0,0,0,.46-1,3.44,3.44,0,0,0,.16-1.07,2.56,2.56,0,0,0-.18-1,1.92,1.92,0,0,0-.5-0.71,2.1,2.1,0,0,0-.74-0.42,2.91,2.91,0,0,0-.91-0.14,2.71,2.71,0,0,0-.9.14,2.41,2.41,0,0,0-1.28,1,2.36,2.36,0,0,0-.31.78,0.73,0.73,0,0,1-.22.38,0.58,0.58,0,0,1-.38.12h-0.21l-0.84-.14a4.73,4.73,0,0,1,.49-1.56,3.72,3.72,0,0,1,.92-1.14,3.91,3.91,0,0,1,1.27-.7A4.86,4.86,0,0,1,511.25,606.58Z"
          transform="translate(-29.77 -455.9)"
          fill="#4a91f0"
        />
        <rect
          ref={ratingReviewProfileBGRef}
          x="85.09"
          y="131.97"
          width="55.7"
          height="55.7"
          rx="4"
          ry="4"
          fill="#4a91f0"
        />
        <g ref={ratingReviewUWLogoRef}>
          <polygon
            points="101.69 162.92 112.94 154.08 124.21 162.92 122.6 166.94 121 169.24 119.65 171.24 115.86 174.49 112.86 176.1 109.65 174.22 107.21 172.13 105.24 169.4 103.34 166.72 101.69 162.92"
            fill="#ffd54f"
          />
          <polygon
            points="101.69 162.69 113.13 153.78 124.21 162.69 122.37 166.72 112.85 158.82 102.89 166.45 101.69 162.69"
            fill="#fff"
          />
          <polygon
            points="99.45 143.58 99.75 153.3 100.49 158.77 101.62 162.51 112.85 153.55 124.21 162.92 125.61 157.52 126.27 149.35 126.27 143.48 99.45 143.58"
            fill="#ffd54f"
          />
          <path
            d="M134.71,604a1.31,1.31,0,0,1-.11.1,2.5,2.5,0,0,0-.17.28,1.8,1.8,0,0,0-.19.39s-0.06,0-.08,0a0.78,0.78,0,0,1-.08,0c-0.14,0-.13,0-0.23,0l-0.19,0h-0.1a0.24,0.24,0,0,1-.1,0c0-.08,0-0.16-0.05-0.24a0.65,0.65,0,0,0-.16-0.11,0.6,0.6,0,0,0-.16-0.08l-0.14-.06a0.92,0.92,0,0,1-.24-0.09,1.3,1.3,0,0,1-.21-0.2c-0.11-.14-0.13-0.34-0.23-0.49a0.65,0.65,0,0,0-.44-0.28c-0.39-.07,0-0.08-0.11-0.37a1.2,1.2,0,0,0-1.08-.62c-0.1,0-.13-0.39-0.38-0.28a1.06,1.06,0,0,1,.57-0.4c0.1-.1,0-0.13,0-0.13a0.47,0.47,0,0,0-.23-0.07,0.5,0.5,0,0,1-.16-0.2,0.94,0.94,0,0,0,0-.25s0,0,0,0a0.54,0.54,0,0,0,.29-0.16l0,0a0.68,0.68,0,0,1,.26,0c0.12,0,.16.1,0.13,0.07a0.25,0.25,0,0,1,.14.16,0.63,0.63,0,0,0,0,.11,0.67,0.67,0,0,0,.09.23,0.18,0.18,0,0,1,0,.05,0.43,0.43,0,0,0,.13,0l0,0c0.05,0,0,.05.06,0s0,0,0-.08a0.44,0.44,0,0,1,0-.4,0.21,0.21,0,0,1,0-.06,0.2,0.2,0,0,0,.05-0.06,0.62,0.62,0,0,0,.06-0.16,0.19,0.19,0,0,0,.08.06,0.43,0.43,0,0,0,.15.07,0.2,0.2,0,0,1,.05,0,0.63,0.63,0,0,1,.18.4c-0.3,1.37,1,2.44,2.43,2.75m-3.61.17a0.77,0.77,0,0,0-.5-0.06,0.14,0.14,0,0,0-.09.18c0.07-.07.17,0,0.16,0.06-0.06.21-.1,0.24,0.18,0.41-1-.05-0.67.8-0.55,0.6a0.42,0.42,0,0,1,.44.15,0.86,0.86,0,0,1-.2.45,0.52,0.52,0,0,0,.16.39c0-.2.25-0.13,0.36-0.07a2.26,2.26,0,0,1,.37-0.29c0.27,0,.31,0,0.37.18a0.41,0.41,0,0,1,0,.23c0.33,0,.58-0.41.88-0.29a2,2,0,0,0,1.36.21,4.3,4.3,0,0,1,.05-1,2.55,2.55,0,0,1-2.21-.19c-0.38-.19-0.32-0.75-0.75-1m2-2.07c0.51,0.76,1.67.14,2.06,0.28-0.53-.93-1.45-0.14-2.06-0.28m5.12,1.35a3.25,3.25,0,0,0-.66-2,1.9,1.9,0,0,1-.84,1.76c-0.85.5-1.91,0.82-2.2,1.87a3.09,3.09,0,0,0-.06,1.63,0.47,0.47,0,0,1,.41-0.39,2.34,2.34,0,0,0,1.61-.59,1.44,1.44,0,0,1,.7.35c0-.1,0-0.56.07-0.48a1.4,1.4,0,0,0,.79.25c-0.67-.76.16-1.62,0.17-2.42m-3.89,9c0.1,0,0,.11,0,0.13a0.67,0.67,0,0,0-.2.21,0.29,0.29,0,0,0-.05.21,1.09,1.09,0,0,0,.05.16,0.32,0.32,0,0,0,.07.08l0,0.06a0.14,0.14,0,0,1,.12-0.15c0.53,0.3.56-.31,0.87-0.52a0.25,0.25,0,0,1,.36.29,3.36,3.36,0,0,0,.65-0.86,6,6,0,0,1,2-1.29,6.1,6.1,0,0,1-.84-0.82c-0.1-.16-0.21-0.46,0-0.41a1.11,1.11,0,0,0,1.48-1c1.31,0.17,1.65-1.07,1.83-2a1.47,1.47,0,0,0,.06-1.27c-0.11-.32.58-0.43,0.46-1a0.51,0.51,0,0,0-.34-0.33c0.11,0.3-.4.38-0.45,0.5a1.84,1.84,0,0,0-.23.55,1.59,1.59,0,0,1,.32-1.86c0.59-.8,1.8-0.38,2.31.14a1.18,1.18,0,0,0-.36-0.75,3.36,3.36,0,0,0,1.65-.12,1.68,1.68,0,0,0,.93-0.81c-0.8.11-1.88-.51-2.6-0.63a2.53,2.53,0,0,0-2.73,1.77,2.63,2.63,0,0,0,.35,2.72c0.13,0.2-.46.07-0.69,0.19a0.59,0.59,0,0,0-.27.65,0.71,0.71,0,0,1,1.11.41c0.09,0.71-.62,1.74-1.31,1.43a2.87,2.87,0,0,1-1.4-2c-0.63.55-1.8,0.1-2.35,0.63s0.81,0.85,1.32,1.09a0.54,0.54,0,0,1,.35.52,1.11,1.11,0,0,0-1.73.92,1.5,1.5,0,0,0,1.48,1.1,0.27,0.27,0,0,1,.1.53c-0.58.37-1.23,0.77-1.86,0.11a0.42,0.42,0,0,0-.56.16,0.76,0.76,0,0,0,0,.35,0.2,0.2,0,0,1,.13-0.14,0.15,0.15,0,0,1,.13.12c-0.05.32-.48,0.11-0.61,0.37v0l0,0.06c-0.09.17-.2,0.28,0,0.41a0.41,0.41,0,0,1,.1.17,0.16,0.16,0,0,1,.17-0.15h0.09Zm-2.75-3c0.06,0,.13.09,0.07,0.14a0.73,0.73,0,0,0-.18.17,0.39,0.39,0,0,0,0,.3,0.64,0.64,0,0,0,.17.15l0.09,0.07a0.09,0.09,0,0,1,0-.11,0.1,0.1,0,0,1,.09,0,0.28,0.28,0,0,0,.26,0,0.3,0.3,0,0,0,.17-0.09,2.44,2.44,0,0,0,.2-0.32l0.18-.12a0.39,0.39,0,0,1,.31.67,2.32,2.32,0,0,1,1.87-.45,1.27,1.27,0,0,1,.66-1.81c-0.8-.77-1.47-0.73-1.78.07-0.15.39,0.31,0.86-.15,1.06a1,1,0,0,1-.78,0c-0.48-.17-0.19-0.79-0.58-1.1a0.54,0.54,0,0,0-.89.36s0.09-.09.14,0a0.44,0.44,0,0,0,.38.42c0.06,0,0,.15-0.07.14a1.94,1.94,0,0,1-.27-0.06,0.47,0.47,0,0,0-.53.1l-0.06.06a0.4,0.4,0,0,0-.05.09,0.47,0.47,0,0,0,0,.22,0.19,0.19,0,0,0,0,.08,0.35,0.35,0,0,0,0,.08l0.07,0.08a0.56,0.56,0,0,0,.3.16,0.13,0.13,0,0,1,0-.07,0.13,0.13,0,0,1,0-.1,0.23,0.23,0,0,1,.15-0.05,0.35,0.35,0,0,1,.25,0m14.66-7c0.06,0,0,.14-0.07.16s-0.19,0-.25,0a0.83,0.83,0,0,0-.26.77,0.46,0.46,0,0,1,.41,0,2.16,2.16,0,0,0,.56-0.41,1.33,1.33,0,0,1,.84.78,0.59,0.59,0,0,0-.16.24,1.82,1.82,0,0,1,1.27.57,3,3,0,0,1,.55-0.69c-0.74-.72-2.22-0.95-2-2.26a0.54,0.54,0,0,0-.25-0.4,1.06,1.06,0,0,0-.45-0.13,2.25,2.25,0,0,1-.08.78s0,0-.06,0a1.74,1.74,0,0,1-.25-0.15,0.32,0.32,0,0,0-.23,0,0.36,0.36,0,0,0-.14.06,0.67,0.67,0,0,0-.15.19l0,0a0.18,0.18,0,0,0,0,.09,0.28,0.28,0,0,1,.18,0c0,0.05,0,.12.08,0.17a0.31,0.31,0,0,0,.17.1,0.69,0.69,0,0,0,.34.06m1.95-.51a3.61,3.61,0,0,0-.45-0.07,1.05,1.05,0,0,0,1.62.26,0.27,0.27,0,0,1,.26,0c-0.51-.6-1-0.25-1.43-0.21m2,1.68c-0.52.27-1.93,1.46-1.44,1.91a2.44,2.44,0,0,1,1,.48,1.7,1.7,0,0,1,1.35-.54,1.8,1.8,0,0,1,.86.29c-0.17-1.18.64-2.32,0.23-3.47,0,0-.15-0.48-0.21-0.3a3,3,0,0,1-1.84,1.64m-2.08,7.66a0.35,0.35,0,0,1,.09.18,2.19,2.19,0,0,1,1.73-.25,1.6,1.6,0,0,1,.7-1.72,0.79,0.79,0,0,0-.95-0.72c-0.58.21-.34,0.94-0.45,1.45a0.57,0.57,0,0,1-.7.39,1.36,1.36,0,0,1-.79-1.11,0.53,0.53,0,0,0-.87-0.1c-0.4.78,0.24-.09,0.2,0.5a1,1,0,0,0-.57.38c-0.07.24,0.16,0.4,0.44,0.48a0.5,0.5,0,0,1,0-.15,0.36,0.36,0,0,1,.23.1c-0.27.17-.34,0.56,0.15,0.72a0.28,0.28,0,0,1,0-.17,0.69,0.69,0,0,1,.78,0M140.2,619c0.39,0.83,1.13.3,1.73,0.21a1.23,1.23,0,0,0-.52-0.32,1.72,1.72,0,0,1-1.21.11m-0.24.48a0.26,0.26,0,0,0-.1-0.06l-0.12,0-0.1,0a0.28,0.28,0,0,1,0,.11,0.38,0.38,0,0,0-.1.09,0.21,0.21,0,0,0,0,.07,1.64,1.64,0,0,0,0,.17,0.57,0.57,0,0,0,0,.13l0,0.1,0.07,0.08c0.09,0.09,0,0,.12.14s0,0.14-.08.12a8,8,0,0,1-.73-0.64,0.48,0.48,0,0,0-.61.45,0.13,0.13,0,0,1,.18.07c0.09,0.36.61,0.14,0.63,0.4a1.17,1.17,0,0,1-.55.08,0.58,0.58,0,0,0-.05.78,2.54,2.54,0,0,1,.62,0,2.2,2.2,0,0,1,.31-0.28c0.4-.18.52,0.2,0.43,0.57a6.85,6.85,0,0,1,.85-0.24c0.21-.06.22-0.55,0.49-0.73a0.94,0.94,0,0,1-.93-0.52,0.49,0.49,0,0,1,0-.13,0.86,0.86,0,0,0-.06-0.4l0,0,0-.06a0.45,0.45,0,0,0-.14-0.11,0.21,0.21,0,0,1-.07,0M137.23,622c0.16,0.31-.64-0.19-0.94.28a1.59,1.59,0,0,0,0,.68,1.76,1.76,0,0,0,.71-0.15s0.08,0.06,0,.11a0.4,0.4,0,0,0-.13.44,1,1,0,0,0,.33.29c0-.21.38,0,0.44-0.4,0-.17.07-0.44,0.31-0.34a0.48,0.48,0,0,1,.21.59,1.67,1.67,0,0,1,1.34-.21,6.9,6.9,0,0,0,1.89.69,1.6,1.6,0,0,1-.44-1.42,4.44,4.44,0,0,1-2.72-.24,0.77,0.77,0,0,1-.27-0.59,0.71,0.71,0,0,0-.67-0.45,0.76,0.76,0,0,0-.45.35s0,0,0,.07a0.13,0.13,0,0,1,.19.07,0.45,0.45,0,0,0,.09.15,0.73,0.73,0,0,1,.16.11m2.19,5a0.32,0.32,0,0,1,.4-0.1c0.19,0,.17.27,0.15,0.43a3.51,3.51,0,0,1,2.27-.67,1.11,1.11,0,0,1,.38-1.77,4.21,4.21,0,0,1-.5-0.1c-0.61-.39-1.36-0.76-1.76.06a1,1,0,0,0,.45,1.06c0.05,0.06,0,.1-0.1.11-0.67.17-1.89,0.27-2-.73a0.49,0.49,0,0,0-.86.42c0.11-.08.44-0.05,0.4,0.2s-0.5-.12-0.68.11a0.74,0.74,0,0,0,0,.74,0.14,0.14,0,0,1,.12-0.15c0.51-.09.54,0.09,0.39,0.59a0.7,0.7,0,0,0,.26.38,0.15,0.15,0,0,1,0-.1,0.13,0.13,0,0,1,.07-0.05l0.17,0,0.07,0a0.41,0.41,0,0,0,.1-0.1,0.71,0.71,0,0,1,.42-0.36,0.34,0.34,0,0,1,.23.08m5.29,2.32c0.47-.46.81-1.08,1.31-1.54a2,2,0,0,1-1.3-1.38,0.11,0.11,0,0,1,.1-0.1,1.75,1.75,0,0,0,2.34-.32c0.44-.63.64-1.65,1.5-1.71a1.17,1.17,0,0,1,.51-1.48,1.15,1.15,0,0,0-.54-0.16c-0.22,0-.31.33-0.56,0.38,0.39-1.32-.37-3.16-1.82-3.13a0.82,0.82,0,0,0-.72.52,1,1,0,0,0,.08.88,2.28,2.28,0,0,1,.67,1.94,1.63,1.63,0,0,0,.64-1.18c0-.11.2,0,0.24-0.08,0.4-.58-0.25-0.94-0.6-1.31-0.1-.1.15-0.25,0.18-0.24,1.25,0.37,1.37,1.91.83,2.91a2.08,2.08,0,0,0-.85-0.18c0.58,0.29.43,0.34,0.41,0.43a2.69,2.69,0,0,1-.67.23,1.29,1.29,0,0,0-.32,1.07,0.88,0.88,0,0,1,.9-0.48c0.73,0.38,0,1.65-.73,1.86a1.3,1.3,0,0,1-1.51-.52c-0.53-.75-0.14-1.65-0.52-2.4-0.31.08-.24,0.49-0.4,0.41a4.37,4.37,0,0,1-1.32-1.4,1.26,1.26,0,0,1-.42.21,1.59,1.59,0,0,0-.81,0,1.26,1.26,0,0,0,.82,1.57,3.49,3.49,0,0,1,1.67,1,3.17,3.17,0,0,1-.63-0.13,1,1,0,0,0-.56.18,0.79,0.79,0,0,0-.33.69c0.16,1.27,1.65,1.28,2.34,2.09a1.12,1.12,0,0,1-.46.91c-0.24.19-.81-0.29-0.72-0.69s-0.71-.54-1-0.17a0.1,0.1,0,0,1,.13.11,0.92,0.92,0,0,0,.31.46c0,0.21-.2-0.09-0.34-0.11a0.8,0.8,0,0,0-.81.3,0.35,0.35,0,0,0-.12.33c0.24-.12.37,0.26,0.59,0.14a0.58,0.58,0,0,1,.41-0.15c0.07,0,.13.11,0.07,0.14-0.44.28-.79,0.68-0.47,1.13a0.24,0.24,0,0,1,.16-0.2c0.13,0,.3.05,0.42,0s0.1-.27.18-0.42,0.54-.61.77-0.33a0.17,0.17,0,0,1-.12.24,2.84,2.84,0,0,0,.35.1l0.09,0a0.22,0.22,0,0,0,.07,0,0.31,0.31,0,0,0,.12-0.19,0.3,0.3,0,0,0,.28-0.06,1.46,1.46,0,0,1,.2-0.2m-2.17-9.14a2.38,2.38,0,0,0-1.5,1.66,1,1,0,0,0-.05.28,1.11,1.11,0,0,1,.78-0.32,0.93,0.93,0,0,1-.16.49,2.21,2.21,0,0,0,1.25-.42,3.72,3.72,0,0,1,.08.45,2.23,2.23,0,0,0,.91,1,1,1,0,0,0,.28-0.34,0.73,0.73,0,0,1,.58.21,1.13,1.13,0,0,0-.16-0.51c-0.24-1.19.26-2.17,0.24-3.31a0.84,0.84,0,0,0-.33-0.69,2.41,2.41,0,0,1-1.92,1.56m-5.72-19.37a3,3,0,0,0-1-.16,11.77,11.77,0,0,1-1.18.43,0.43,0.43,0,0,0-.34.48,0.86,0.86,0,0,1,1.16.08,0.91,0.91,0,0,1,0,.83,0.86,0.86,0,0,1-.9.29,0.25,0.25,0,0,1,.07.28c0.78-.2,1.93.1,2.45-0.79a2.87,2.87,0,0,0,0-.9,3.62,3.62,0,0,1,.32-0.4,1.11,1.11,0,0,0-.1-0.42,0.71,0.71,0,0,1-.5.29m-0.58.44c-0.26.12-.86,0.2-0.76,0s0.51-.41.8,0a0.07,0.07,0,0,1,0,0m14.94,1.27a1.44,1.44,0,0,0,.48-0.91c0.09-.21.33-0.2,0.42-0.44a0.6,0.6,0,0,0,0-.39,1.35,1.35,0,0,1-.76.17c-0.75-.21-0.94-0.59-1.66-0.06a2,2,0,0,0-.89.33,0.64,0.64,0,0,0,0,.29c0.38,0,.92-0.4,1.15,0a0.57,0.57,0,0,1,.08.22v0a1.14,1.14,0,0,1,0,.3,0.58,0.58,0,0,1-.16.34,1,1,0,0,1-.1.08l0,0a0.57,0.57,0,0,1-.13.07l-0.11,0h-0.2c-0.09,0-.1,0-0.16,0a0.23,0.23,0,0,0-.06.16,0.55,0.55,0,0,1,.17,0l0.25,0.06a1.61,1.61,0,0,0,.32,0h0.47a1,1,0,0,0,.19,0l0.19-.08,0.23-.16c0.13-.09.31-0.08,0.43-0.18m-0.52-1.38c-0.28.15-1,.37-0.89,0.06s0.57-.22.89-0.06c0,0,0,0,0,0m-7.14,16.77a1.5,1.5,0,0,0-1.26,0s-0.28.3-.26,0.31a0.66,0.66,0,0,0-.82.57,0.71,0.71,0,0,1,.62-0.15,0.9,0.9,0,0,1,.2.83,0.62,0.62,0,0,1-.52.36c-0.12,0-.06.17-0.06,0.26a6.18,6.18,0,0,0,2.2-.82,1.2,1.2,0,0,0,.43-0.84,0.88,0.88,0,0,0,.38-0.73,0.83,0.83,0,0,1-.91.2m-1,.58a0.24,0.24,0,0,1-.11-0.07,0.22,0.22,0,0,1,0-.18,0.2,0.2,0,0,1,.08-0.11,0.42,0.42,0,0,1,.13,0l0.07,0h0.06c0.08,0,.14.07,0.22,0.08l0.31,0h0a0.36,0.36,0,0,1-.08.08,1.38,1.38,0,0,1-.65.24m10.72-3.73a5.39,5.39,0,0,0,.27-0.68c0-.81.51-1.2,0.53-2.07,0-.23-0.94-0.44-1-0.93,0-.24-0.1-0.59.14-0.59a1.2,1.2,0,0,0,.84-0.24c1-.87.15-2,0-3.09a7.82,7.82,0,0,1,.39-0.88,5.79,5.79,0,0,1,.08-2.56c-0.25.22-.32,0.59-0.53,0.77s-0.15-.11-0.14-0.15a7.75,7.75,0,0,1,.78-2.16,1.16,1.16,0,0,0-.57-1.82,1.22,1.22,0,0,0-1.47,1.1,5.26,5.26,0,0,0,.27,1.88c0,0.15,0,.32,0,0.45a6.22,6.22,0,0,0,.13-1.6,0.4,0.4,0,0,1,.24-0.35,0.47,0.47,0,0,1,.67.46,18.64,18.64,0,0,1-.46,2.25,7.94,7.94,0,0,0,.21,2.75,0.52,0.52,0,0,0-.88.33,1.76,1.76,0,0,0,.27.86c0-.35.34-0.84,0.67-0.62a2.26,2.26,0,0,1,.32,1.7,0.8,0.8,0,0,1-1,.5,1.22,1.22,0,0,1-.3-0.6,4.41,4.41,0,0,1-1.22-2.93c0-.17.08-0.6,0.05-0.61a1.39,1.39,0,0,0-1.94.61,0.8,0.8,0,0,0-.5-0.39,1.21,1.21,0,0,0,.16,1.28,6.43,6.43,0,0,1,2,2.14,1.22,1.22,0,0,0-1.13.7,1.11,1.11,0,0,0,.43,1.46,4.29,4.29,0,0,0,1.39,0,1,1,0,0,1,.94.93s-0.2,1.08-.66.82c-0.25-.14-0.11-0.72-0.49-0.81a0.5,0.5,0,0,0-.57.53c0.16-.15.28,0.1,0.59,0.27-1.06-.23-0.73.74-0.69,0.64s0.25,0,.63,0a0.59,0.59,0,0,1-.09.09,1.64,1.64,0,0,0-.13.25,0.3,0.3,0,0,0,0,.15,0.35,0.35,0,0,0,.05.14l0,0,0,0s0-.08,0-0.08H152l0.1,0,0.09,0a0.28,0.28,0,0,0,.16,0,0.51,0.51,0,0,0,.16-0.07l0.07-.06a0.19,0.19,0,0,1,.12-0.13,0.35,0.35,0,0,1,.46-0.2,0.21,0.21,0,0,1,.09.08,0.27,0.27,0,0,0,.06.11,2.5,2.5,0,0,1,.1.26m-7.57-9.61c0.05,0-.08.1-0.11,0.06-0.47-.55-1.25-0.47-1.19.41,0.3-.15.34,0.26,0.53,0.15a0.5,0.5,0,0,1,.47-0.13,0.16,0.16,0,0,1,0,.26c-0.86.3-.17,0.87-0.3,1a1.65,1.65,0,0,0,.81-0.61,0.88,0.88,0,0,1,.63-0.07c0.23,0.07,0,.43.09,0.41a1.71,1.71,0,0,1,1,.46,5.07,5.07,0,0,0,1.48.73,1.55,1.55,0,0,1-.28-1.52,6.07,6.07,0,0,1-1.54-.27c-1-.24-0.91-1.24-1.09-1.65l-0.06-.07a0.47,0.47,0,0,0-.42-0.27h-0.19a0.07,0.07,0,0,1,0,.12s0,0,0,0,0,0,0,0l0,0v0a0.39,0.39,0,0,0-.12.43,0.22,0.22,0,0,0,0,.09l0,0a1,1,0,0,0,.13.18Z"
            transform="translate(-29.77 -455.9)"
            fill="#ba0c2f"
          />
          <path
            d="M129,599.46q0,1,0,1.9c0.17,8.22.32,16,5,23.45a20.45,20.45,0,0,0,8.57,7.41l0.11,0.05,0.11-.05a20.47,20.47,0,0,0,8.56-7.41c4.68-7.46,4.84-15.22,5-23.44,0-.63,0-1.27,0-1.9v-0.28H129v0.28Zm22,25a19.92,19.92,0,0,1-8.23,7.16,19.9,19.9,0,0,1-8.24-7.16c-0.31-.5-0.6-1-0.87-1.49l9.13-7.52,9.09,7.5C151.55,623.49,151.26,624,150.95,624.5Zm1.63-3-9.84-8.11-9.88,8.14q-0.51-1.09-.91-2.18l10.79-8.89,10.75,8.86Q153.08,620.43,152.57,621.51Zm3.32-21.79c0,0.54,0,1.08,0,1.63-0.11,5.66-.22,11.1-1.83,16.35l-11.3-9.32-11.35,9.34c-1.61-5.26-1.72-10.71-1.83-16.38q0-.81,0-1.62h26.37Z"
            transform="translate(-29.77 -455.9)"
          />
        </g>
      </g>
      <g id="interviewReview">
        <rect
          ref={interviewPaperRef}
          x="69.54"
          y="201.97"
          width="443.53"
          height="84.75"
          rx="8"
          ry="8"
          fill="#fff"
        />
        <rect
          ref={interviewProfileBGRef}
          x="85.09"
          y="215.78"
          width="55.7"
          height="55.7"
          rx="4"
          ry="4"
          fill="#2247a3"
        />
        <path
          ref={interviewThumbDownRef}
          d="M501.19,694.54h-3.65v11h3.65v-11Zm-20.1,10a1.83,1.83,0,0,0,1.83,1.83h5.76l-0.87,4.17,0,0.29a1.38,1.38,0,0,0,.4,1l1,1,6-6a1.79,1.79,0,0,0,.54-1.29v-9.14a1.83,1.83,0,0,0-1.83-1.83h-8.22a1.81,1.81,0,0,0-1.68,1.11l-2.76,6.44a1.8,1.8,0,0,0-.13.67v1.83Z"
          transform="translate(-29.77 -455.9)"
          fill="#2247a3"
        />
        <path
          ref={interviewThumbUpRef}
          fill={Color.interview}
          d="M440.29,709.34h3.65v-11h-3.65v11Zm20.1-10a1.83,1.83,0,0,0-1.83-1.83h-5.76l0.87-4.17,0-.29a1.38,1.38,0,0,0-.4-1l-1-1-6,6a1.79,1.79,0,0,0-.54,1.29v9.14a1.83,1.83,0,0,0,1.83,1.83h8.22a1.81,1.81,0,0,0,1.68-1.11l2.76-6.44a1.8,1.8,0,0,0,.13-0.67v-1.83Z"
          transform="translate(-29.77 -455.9)"
        />
        <path
          ref={interviewThumbUpValRef}
          fill={Color.interview}
          d="M473.55,694.08a0.77,0.77,0,0,1-.22.56,1,1,0,0,1-.73.22h-4.06l-0.6,3.39a9,9,0,0,1,1.87-.22,4.91,4.91,0,0,1,1.78.3,3.67,3.67,0,0,1,1.29.82,3.41,3.41,0,0,1,.79,1.24,4.4,4.4,0,0,1,.27,1.55,4.61,4.61,0,0,1-.36,1.86,4.26,4.26,0,0,1-1,1.42,4.34,4.34,0,0,1-1.47.91,5.22,5.22,0,0,1-1.83.32,5.16,5.16,0,0,1-1.09-.11,5.52,5.52,0,0,1-1-.3,5.76,5.76,0,0,1-.84-0.43,4.85,4.85,0,0,1-.69-0.51l0.49-.68a0.5,0.5,0,0,1,.43-0.23,0.8,0.8,0,0,1,.4.14l0.55,0.31a4.75,4.75,0,0,0,.76.31,3.45,3.45,0,0,0,1,.14,3.25,3.25,0,0,0,1.22-.22,2.58,2.58,0,0,0,.92-0.62,2.76,2.76,0,0,0,.59-1,3.58,3.58,0,0,0,.21-1.25,3.2,3.2,0,0,0-.18-1.09,2.15,2.15,0,0,0-.53-0.83,2.45,2.45,0,0,0-.89-0.53,3.72,3.72,0,0,0-1.24-.19,6.52,6.52,0,0,0-1,.08,7,7,0,0,0-1.08.26l-1-.3,1-6h6.12v0.7Z"
          transform="translate(-29.77 -455.9)"
        />
        <rect
          ref={interviewThumbUpBGRef}
          x="404.58"
          y="230.86"
          width="44.72"
          height="29.02"
          rx="8"
          ry="8"
          fill="#2247a3"
        />
        <path
          ref={interviewThumbUpPressedRef}
          d="M440.29,709.34h3.65v-11h-3.65v11Zm20.1-10a1.83,1.83,0,0,0-1.83-1.83h-5.76l0.87-4.17,0-.29a1.38,1.38,0,0,0-.4-1l-1-1-6,6a1.79,1.79,0,0,0-.54,1.29v9.14a1.83,1.83,0,0,0,1.83,1.83h8.22a1.81,1.81,0,0,0,1.68-1.11l2.76-6.44a1.8,1.8,0,0,0,.13-0.67v-1.83Z"
          transform="translate(-29.77 -455.9)"
          fill="#fff"
        />
        <path
          ref={interviewThumbUpPressedValueRef}
          d="M470.59,698.38a4.19,4.19,0,0,1,1.47.26,3.49,3.49,0,0,1,2,2,4.12,4.12,0,0,1,.31,1.64,4.21,4.21,0,0,1-.32,1.66,4.06,4.06,0,0,1-.91,1.33,4.17,4.17,0,0,1-1.4.89,4.86,4.86,0,0,1-1.8.33,4.76,4.76,0,0,1-1.76-.31,3.8,3.8,0,0,1-1.35-.88,3.89,3.89,0,0,1-.86-1.39,5.23,5.23,0,0,1-.3-1.83,4.9,4.9,0,0,1,.38-1.8,9.16,9.16,0,0,1,1.2-2.06l3.27-4.41a1,1,0,0,1,.35-0.28,1.15,1.15,0,0,1,.51-0.11h1.42L468.36,699a3.82,3.82,0,0,1,1-.49A4,4,0,0,1,470.59,698.38Zm-3.34,3.93a3.42,3.42,0,0,0,.18,1.14,2.46,2.46,0,0,0,.53.88,2.34,2.34,0,0,0,.85.57,3,3,0,0,0,1.14.2,3.17,3.17,0,0,0,1.17-.21,2.66,2.66,0,0,0,.9-0.58,2.56,2.56,0,0,0,.58-0.87,2.92,2.92,0,0,0,.2-1.1,3.12,3.12,0,0,0-.2-1.14,2.38,2.38,0,0,0-1.42-1.41,3.14,3.14,0,0,0-1.11-.19,3,3,0,0,0-1.17.22,2.69,2.69,0,0,0-.89.59,2.59,2.59,0,0,0-.56.87A2.76,2.76,0,0,0,467.25,702.31Z"
          transform="translate(-29.77 -455.9)"
          fill="white"
        />
        <path
          ref={interviewStar5Ref}
          d="M264.21,704.56l3.19-1.91,3.19,1.93L269.74,701l2.8-2.44-3.7-.33-1.44-3.41L266,698.18l-3.7.33,2.8,2.44Zm-1.83,2.54,1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38,2.28,5.38,5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#2247a3"
        />
        <path
          ref={interviewStar4Ref}
          d="M245.54,704.56l3.19-1.91,3.19,1.93L251.07,701l2.8-2.44-3.7-.33-1.44-3.41-1.44,3.39-3.7.33,2.8,2.44Zm-1.83,2.54,1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38L251,697l5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#2247a3"
        />
        <path
          ref={interviewStar1Ref}
          d="M181.73,707.1l1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38L189,697l5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#2247a3"
        />
        <path
          ref={interviewStar2Ref}
          d="M201.89,707.1l1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38,2.28,5.38,5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#2247a3"
        />
        <path
          ref={interviewStar3Ref}
          d="M222.06,707.1l1.32-5.71-4.43-3.84,5.85-.51,2.28-5.38,2.28,5.38,5.85,0.51-4.43,3.84,1.32,5.71-5-3Z"
          transform="translate(-29.77 -455.9)"
          fill="#2247a3"
        />
        <g id="Page-1" ref={topLeetcodeIconRef}>
          <g id="branding_-resource" data-name="branding -resource">
            <g id="_1_black" data-name="1_black">
              <path
                id="path_3"
                data-name="path 3"
                d="M307.54,692.72a1.3,1.3,0,0,1,1.83,1.84l-2.25,2.25a5.43,5.43,0,0,1-7.59.07l-4.06-4a5.25,5.25,0,0,1-.33-7.35l3.63-3.88a5.86,5.86,0,0,1,7.69-.51l3.29,2.66a1.3,1.3,0,0,1-1.63,2l-3.29-2.66a3.28,3.28,0,0,0-4.17.26L297,687.32a2.66,2.66,0,0,0,.25,3.72l4,4a2.84,2.84,0,0,0,4,0Z"
                transform="translate(-29.77 -455.9)"
                fill="#ffa116"
              />
              <path
                id="path_2"
                data-name="path 2"
                d="M302.06,690.46a1.3,1.3,0,0,1,0-2.6h9.57a1.3,1.3,0,0,1,0,2.6h-9.57Z"
                transform="translate(-29.77 -455.9)"
                fill="#b3b3b3"
              />
              <path
                id="path_1"
                data-name="path 1"
                d="M303.85,676.22a1.3,1.3,0,1,1,1.9,1.78L297,687.32a2.66,2.66,0,0,0,.25,3.72l4,3.94a1.3,1.3,0,0,1-1.82,1.86l-4-3.94a5.25,5.25,0,0,1-.33-7.35Z"
                transform="translate(-29.77 -455.9)"
                fill="#0a0a0a"
              />
            </g>
          </g>
        </g>
        <rect
          ref={topLeetCodeTextElementRef}
          x="289.01"
          y="229.52"
          width="66.42"
          height="7.49"
          rx="3.74"
          ry="3.74"
          fill="#d3d3d3"
        />
        <g id="Page-1-2" data-name="Page-1" ref={bottomLeetcodeIconRef}>
          <g id="branding_-resource-2" data-name="branding -resource">
            <g id="_1_black-2" data-name="1_black">
              <path
                id="path_3-2"
                data-name="path 3"
                d="M307.54,720.64a1.3,1.3,0,0,1,1.83,1.84l-2.25,2.25a5.43,5.43,0,0,1-7.59.07l-4.06-4a5.25,5.25,0,0,1-.33-7.35l3.63-3.88a5.86,5.86,0,0,1,7.69-.51l3.29,2.66a1.3,1.3,0,0,1-1.63,2l-3.29-2.66a3.28,3.28,0,0,0-4.17.26L297,715.25a2.66,2.66,0,0,0,.25,3.72l4,4a2.84,2.84,0,0,0,4,0Z"
                transform="translate(-29.77 -455.9)"
                fill="#ffa116"
              />
              <path
                id="path_2-2"
                data-name="path 2"
                d="M302.06,718.39a1.3,1.3,0,0,1,0-2.6h9.57a1.3,1.3,0,0,1,0,2.6h-9.57Z"
                transform="translate(-29.77 -455.9)"
                fill="#b3b3b3"
              />
              <path
                id="path_1-2"
                data-name="path 1"
                d="M303.85,704.14a1.3,1.3,0,1,1,1.9,1.78L297,715.25a2.66,2.66,0,0,0,.25,3.72l4,3.94a1.3,1.3,0,0,1-1.82,1.86l-4-3.94a5.25,5.25,0,0,1-.33-7.35Z"
                transform="translate(-29.77 -455.9)"
                fill="#0a0a0a"
              />
            </g>
          </g>
        </g>
        <rect
          ref={bottomLeetCodeTextElementRef}
          x="289.01"
          y="257.44"
          width="83.41"
          height="7.49"
          rx="3.74"
          ry="3.74"
          fill="#d3d3d3"
        />
        <g ref={gooseProfileRef} clip-path="url(#clip-path)">
          <g id="layer1">
            <g id="g8183">
              <path
                id="path5808"
                d="M118.05,692.86c0.78,1.21,9.54,1.47,15.17,1.11,5,0.54,10.54,2.75,13.65,3.95,5.48,11.9,3.79,28.79-1.05,39.93-0.6,1.39-2.77,7.25-4.19,9.25,2.86,2,5.52,4.46,7.82,4.95,2.11,0.45,5.28,2,8,3.36a8.76,8.76,0,0,0,3.64-.31c-2.29-2.65-4.64-8-3.23-11.5,4.49-11,4.92-40.43-.69-59.57-2.36-2.45-4.08-4.28-9.92-5.06-9.43-1.26-12.07,5-14.88,6.54a79.42,79.42,0,0,1-8.76,4.29c-2.49.93-3.92,1.18-5.5,3.06h0Z"
                transform="translate(-29.77 -455.9)"
                stroke="#000"
              />
              <path
                id="path5810"
                d="M137.54,694.47c3.14,1.2,4.7,2.28,7.13,2.71,3.28,0.59,2.59,2,4,4.52,0.59,1.05,3.43-1.72,3.82-2.11s1.33-.63,1.81-1.1c1.49-1.49,1.44-4.15,1.41-6.33a20.15,20.15,0,0,0,.8-2.81c2.64-2.64-3.06-6.13-5.42-5.22-3.14,1.2-7.14,7.79-13.56,10.35h0Z"
                transform="translate(-29.77 -455.9)"
                fill="#e6e6e6"
                stroke="#000"
              />
              <g id="path6342">
                <path
                  d="M140.45,695.07a4.62,4.62,0,0,1,1,.8c0.23,0.23,1.07-.13,1.31.1,0.64,0.64,2,.48,2.61,1.1a3.61,3.61,0,0,0,1.31.4c0.79,0.26,2.1,5,2.57,5.45,0,0,4.17-4.35,4.26-4.44,0.56-.56,1.64-0.64,2.11-1.1a2.93,2.93,0,0,0-.1-3.21c-0.29-.29.2-1.48,0.2-1.81s0.1-.8.1-1.21c0-.13-0.13-0.4,0-0.4s-0.1.16-.1,0.2c0,0.71-5,1.61-6.33,1.61a7.84,7.84,0,0,0-4,1.1c-1.17.58-2.44,0.22-3.62,0.8-0.21.1-1.57-.13-1.51,0.2a1.72,1.72,0,0,0,.2.4h0Z"
                  transform="translate(-29.77 -455.9)"
                  fill="url(#linear-gradient)"
                />
              </g>
              <path
                id="path6374"
                d="M135.43,694.06c-0.59.36-5.31,0.32-6.73,0.2a6.18,6.18,0,0,1-2.41.2,34.56,34.56,0,0,1-4.52-.4c-0.14-.14-3.93-0.69-3.42-1.21,0.31-.31.47-0.94,0.6-1a5.63,5.63,0,0,0,1-.8c0.23-.24,3.12-0.77,4.12-1.31s3.29-1.77,4.62-2.51c0.14-.14,2.35-0.54,2.51-0.7,0.82-.82,2-1.15,2.91-2.11a17.1,17.1,0,0,1,2.81-.1h-0.2c-0.2,0,.46-0.24.6-0.1,0.31,0.31-1.73,2.43-2.21,2.91a10.37,10.37,0,0,0-.8,2c-1,1.91,2.28,1.68,2.91,2.31,0.08,0.08.81,0.7,0.4,1.11-0.73.73-.92,1.76-2.21,1.51h0Z"
                transform="translate(-29.77 -455.9)"
                fill="#666"
                stroke="#000"
              />
              <path
                id="path6376"
                d="M119.35,693.36c1.31,2.19,7.91,1.21,10.85,1.21,1.29,0,5.13.1,5.53-.3s0.56-1.27,1-1.71c0.09-.09,1.2-0.71.9-1-0.12-.12-3.37.4-3.92,0.4-1.25,0-2.18.1-3.42,0.1-1.43,0-2.93.1-4.22,0.1a20.31,20.31,0,0,0-6.73,1.21h0Z"
                transform="translate(-29.77 -455.9)"
                fill="#1a1a1a"
                stroke="#000"
              />
              <path
                id="path6378"
                d="M131.11,689.25a1.87,1.87,0,0,0-1.1-.7c-2.21,0-4,1.29-4.32,2.21C126.67,690.5,130.71,689.64,131.11,689.25Z"
                transform="translate(-29.77 -455.9)"
              />
              <path
                id="path6454"
                d="M134.49,761.42c0.14-.87,1-4.09,1.55-4.64,0.75-.75.8-2.2,1.4-2.79,2-2,2.21-5.11,4.71-7h0c0.92,0.73,3.06,1.59,3.31,2.09a11.21,11.21,0,0,0,1.92,2.44c0.63,0.63,2.11.72,2.79,1.4,0.45,0.45,7.15,1.91,8.2,3,0.4,0.4,5.39-1.11,6.11-1.22"
                transform="translate(-29.77 -455.9)"
                fill="#f2f2f2"
                stroke="#000"
              />
              <path
                id="path6460"
                d="M135,761.54c0.17-1-.14-2.31.3-3.2,2.05-4.11,4.67-8.09,6.29-11.38h0c0.77,1.16,1.9.61,2.8,1.5,4.57,4.57,7.09,4.25,13.18,7.29,1.76,0.88,5.12-.88,5.85-0.15a28.67,28.67,0,0,1-1.56,6.34"
                transform="translate(-29.77 -455.9)"
                fill="#f9f9f9"
              />
              <g id="g6727">
                <path
                  id="path6715"
                  d="M164.16,755.25c-0.14.34,0,3-.4,3.4"
                  transform="translate(-29.77 -455.9)"
                  fill="#b29f94"
                />
                <path
                  id="path6715-2"
                  data-name="path6715"
                  d="M164.16,755.25l-0.3.1"
                  transform="translate(-29.77 -455.9)"
                  fill="#b29f94"
                />
                <path
                  id="path6717"
                  d="M164.26,754.55c-0.14.34,0,3-.4,3.4"
                  transform="translate(-29.77 -455.9)"
                  fill="url(#linear-gradient-2)"
                />
                <path
                  id="path6717-2"
                  data-name="path6717"
                  d="M164.26,754.55l-0.3.1"
                  transform="translate(-29.77 -455.9)"
                  fill="url(#linear-gradient-3)"
                />
              </g>
              <g id="path6733" opacity="0.58" style={{ isolation: "isolate" }}>
                <path
                  d="M166.78,754.32a9.94,9.94,0,0,0-2.46.74c-0.59.59,0.35,2.72-.25,3.31"
                  transform="translate(-29.77 -455.9)"
                  fill="none"
                  stroke="#fefefe"
                  stroke-width="0.7"
                />
              </g>
              <g
                id="path6733-2"
                data-name="path6733"
                opacity="0.58"
                style={{ isolation: "isolate" }}
              >
                <path
                  d="M163.59,762.79c0-.44-0.54-2.66-0.12-3.07,1.14-1.14,1.83-3.55,2.82-4.54,0,0,.12-0.74.12-0.74s-1.57,2.61-1.47,2.7,1.21-.6,1.35-0.74,1.14,0,1.35-.25"
                  transform="translate(-29.77 -455.9)"
                  fill="none"
                  stroke="#fefefe"
                  stroke-width="0.7"
                />
              </g>
              <g
                id="path6733-3"
                data-name="path6733"
                opacity="0.58"
                style={{ isolation: "isolate" }}
              >
                <path
                  d="M167.64,756.28"
                  transform="translate(-29.77 -455.9)"
                  fill="none"
                  stroke="#fefefe"
                  stroke-width="0.7"
                />
              </g>
              <g
                id="path6733-4"
                data-name="path6733"
                opacity="0.58"
                style={{ isolation: "isolate" }}
              >
                <path
                  d="M167.4,757.51c0.05,0-.88,2-1.6,3.44a11.52,11.52,0,0,1-1.23,2.09"
                  transform="translate(-29.77 -455.9)"
                  fill="none"
                  stroke="#fefefe"
                  stroke-width="0.7"
                />
              </g>
              <g
                id="path6733-5"
                data-name="path6733"
                opacity="0.58"
                style={{ isolation: "isolate" }}
              >
                <path
                  d="M166.9,762.91c0.27-.27,1.16-2.33,1.35-2.33"
                  transform="translate(-29.77 -455.9)"
                  fill="none"
                  stroke="#fefefe"
                  stroke-width="0.7"
                />
              </g>
              <g
                id="path6733-6"
                data-name="path6733"
                opacity="0.58"
                style={{ isolation: "isolate" }}
              >
                <path
                  d="M167.89,760.58c-0.75.75-.12,2.39-0.12,1.23"
                  transform="translate(-29.77 -455.9)"
                  fill="none"
                  stroke="#fefefe"
                  stroke-width="0.7"
                />
              </g>
              <path
                id="path7573"
                d="M175.24,857.76"
                transform="translate(-29.77 -455.9)"
                fill="#4d4d4d"
                stroke="#000"
              />
            </g>
          </g>
        </g>
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
