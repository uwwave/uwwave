import { IIcon } from "src/components/icons/icons";

export const CheckIcon = (props: IIcon) => (
  <svg
    width={`${props.width}px`}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="14" r="14" fill="#4CD137" />
    <g clipPath="url(#clip0_45_200)">
      <path
        d="M11.3751 17.6487L7.72639 14L6.48389 15.2337L11.3751 20.125L21.8751 9.62499L20.6414 8.39124L11.3751 17.6487Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_45_200">
        <rect
          width="21"
          height="21"
          fill="white"
          transform="translate(3.5 3.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
